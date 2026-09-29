import cloudinary from "../../config/cloudinary.js";

const deleteFromCloudinary = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
};
export default deleteFromCloudinary