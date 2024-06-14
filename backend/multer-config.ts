import multer from "multer";

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File naming strategy
    }
});

// Multer instance with configured storage
const upload = multer({ storage: storage });

export default upload;
