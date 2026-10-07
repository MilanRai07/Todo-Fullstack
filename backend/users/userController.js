import { generateTokenAndSetCookie } from "../utils/verification/generateTokenAndSetCookie.js";
import { generateVerificationCode } from "../utils/verification/generateVerificationCode.js";
import { sendEmailVerifiedMessage } from "../utils/verification/sendEmailVerifiedMessage.js";
import { sendVerificationEmail } from "../utils/verification/sendVerificationEmail.js";
import uploadToCloudinary from "../utils/cloudinary/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/cloudinary/deleteFromCloudinary.js";
import TodoModel from "../todo/todoModel.js";
import CategoryModel from "../category/categoryModel.js";
import UserModel from "./userModel.js";
import bcryptjs from "bcryptjs";

//Sign up user
export const signUp = async (req, res) => {
    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            throw new Error("All Fields are required")
        }
        const userAlreadyExists = await UserModel.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationCode();

        //just like UserModel.create, we can also use this method.
        //at this poin it is only store in memory
        //making istance we get the document befire savingin db,
        //we can perform an operation here. like tokenExpires
        const user = new UserModel({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000 //24 hours
        })
        //user is not justan object it is mongoosh document

        //here save the documents in database.
        await user.save();

        //jwt part
        generateTokenAndSetCookie(res, user._id);

        //send the verification code tomail in user's email
        sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                //give
                ...user._doc,
                password: undefined,
                verificationToken: undefined,
                verificationTokenExpiresAt: undefined
            }
        })

    } catch (err) {

    }
}
//For verfiication of the user's form /verify-email endpoint
//This end pont is for first time user sign up and immediately verify email only.
//user can sign up but forget to verify email, or some internet error might come.
//next time they will login with isVerified false.
//he can verify the email after login also, but with another endpoint now.
export const verifyEmail = async (req, res) => {
    try {
        //user sends the otp through form
        const { token } = req.body;

        // we find the user with exact same verification Token
        const user = await UserModel.findOne({
            verificationToken: token
        });

        //if user is not founs
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification token"
            });
        }

        // For checking Token Expirationƒ
        if (user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Verification token has expired"
            });
        }

        // update Verify the user's email
        user.isVerified = true;

        // Remove the token after successful verification
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();
        //save db, now user's isVerify is true

        //send emil verified message
        sendEmailVerifiedMessage(user.email);
        res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

//logout
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Logout successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Check password
        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // generate jwt and cookie
        generateTokenAndSetCookie(res, user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                ...user._doc,
                password: undefined,
                verificationToken: undefined,
                verificationTokenExpiresAt: undefined
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//forget password 
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate reset token
        const resetToken = generateVerificationCode();

        // Store token and expiry in database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        // Send reset email
        await sendVerificationEmail(user.email, resetToken);

        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//reset password
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Token and password are required"
            });
        }

        // Find user with valid reset token
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() } //we can alsocheck the expiry like this
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }

        // Hash new password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Update password
        user.password = hashedPassword;

        // Clear reset token after use
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//change password for an authenticated user
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current and new passwords are required"
            });
        }

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isCurrentPasswordCorrect = await bcryptjs.compare(currentPassword, user.password);
        if (!isCurrentPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        user.password = await bcryptjs.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const checkAuth = async (req, res) => {
    //after verifyToken middleware, we can access the userId from req.userId
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId).select('-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

//seperate verify email after login, if user forget to verify email after signup, or some internet error might come.
export const verifyEmailAfterLogin = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified"
            });
        }

        const verificationToken = generateVerificationCode();
        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000; //15 minutes
        await user.save();
        await sendVerificationEmail(user.email, verificationToken);
        return res.status(200).json({
            success: true,
            message: "Verification email sent successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

//profileEdit
export const profileEdit = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.userId;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    name,
                    email,
                    isVerified: email === existingUser.email ? existingUser.isVerified : false
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
};

//profile Picture Edit
export const profileImageEdit = async (req, res) => {
    let uploadedImage = null;
    let imageSaved = false;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required"
            });
        }

        const existingUser = await UserModel.findById(req.userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const result = await uploadToCloudinary(req.file.buffer, "profile-images");
        uploadedImage = {
            url: result.secure_url,
            public_id: result.public_id
        };

        const oldPublicId = existingUser.profileImage?.public_id;
        existingUser.profileImage = uploadedImage;
        await existingUser.save();
        imageSaved = true;

        if (oldPublicId && oldPublicId !== uploadedImage.public_id) {
            try {
                await deleteFromCloudinary(oldPublicId);
            } catch (error) {
                console.error("Failed to delete previous profile image:", error);
            }
        }

        const updatedUser = await UserModel.findById(req.userId)
            .select("-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt");

        return res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            user: updatedUser
        });
    } catch (err) {
        if (uploadedImage?.public_id && !imageSaved) {
            try {
                await deleteFromCloudinary(uploadedImage.public_id);
            } catch (error) {
                console.error("Failed to clean up profile image upload:", error);
            }
        }
        console.error("Failed to update profile image:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const todos = await TodoModel.find({ userId: req.userId }).select("image.public_id");
        await TodoModel.deleteMany({ userId: req.userId });
        await CategoryModel.deleteMany({ userId: req.userId });
        await UserModel.deleteOne({ _id: req.userId });

        const imagePublicIds = [
            ...todos.map((todo) => todo.image?.public_id),
            user.profileImage?.public_id
        ].filter(Boolean);
        const cleanupErrors = [];

        for (const publicId of imagePublicIds) {
            try {
                await deleteFromCloudinary(publicId);
            } catch (error) {
                console.error(`Failed to delete Cloudinary image ${publicId}:`, error);
                cleanupErrors.push(publicId);
            }
        }

        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: cleanupErrors.length
                ? "Profile and associated data deleted, but some stored images could not be removed"
                : "Profile and associated data deleted successfully",
            cleanupWarnings: cleanupErrors.length
        });
    } catch (error) {
        console.error("Failed to delete profile:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete profile"
        });
    }
};