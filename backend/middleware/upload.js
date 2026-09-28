import multer from "multer";
import path from "path";

//diskStorage configures the multer to save the files in server's disk.
const storage = multer.diskStorage({
    //destionation is where we keep the files
    //uploads/todos should be manually created by us.
    destination: (req, file, cb) => {
        cb(null, "uploads/todos")
    },
    //filename is the name of the file we will be giving. it should alwasy be unique
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName)
    }
    //cb is callback, first argument is null means no error
})


//the filter that will accept the file or not
const fileFilter = (req, file, cb) => {
    const allowedExt = /^\.(jpeg|jpg|png|webp)$/;
    const allowedMime = /^image\/(jpeg|png|webp)$/;

    const isExtensionValid = allowedExt.test(
        path.extname(file.originalname).toLowerCase()
    )
    //this checks the file extension of incoming file to be valid(allowedTypes or not)

    const isMimeTypeValid = allowedMime.test(file.mimetype);
    //mimetype:"image/jpeg" looksk lke this for image
    //above test such 

    if (isExtensionValid && isMimeTypeValid) {
        cb(null, true); //accept the file
    } else {
        cb(new Error("Only image files are allowed")) //reject the file
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 //upto 5 mb
    }
})
export default upload;
//this is the final middleware that is made with pieces of above middleware.
//It is exported so tha our routes can use it later∏
