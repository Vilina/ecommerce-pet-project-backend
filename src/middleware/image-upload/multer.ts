import multer from "multer"
import path from 'path';
import { RequestHandler} from 'express';


// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Function to check file type
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Error: Images Only!')); // Reject the file
    }
}

// Initialize multer middleware for file upload
const upload: RequestHandler = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB per file
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb); // Apply file type validation
    }
}).array('files', 5); // Allow up to 5 images per request


export default upload;
