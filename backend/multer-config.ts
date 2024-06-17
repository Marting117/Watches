import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        // Use path.basename to extract the filename from the original file name
        const fileName = path.basename(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

export default upload;
