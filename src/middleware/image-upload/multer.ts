import multer from "multer"
import path from 'path';
import { RequestHandler} from 'express';
import multerS3 from 'multer-s3';
import config from '../../config/index';
import s3 from '../../libs/s3Client';

const bucketName: string = config.aws.aws_bucket_name;

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

// Initialize multer and multerS3 for storage middleware for file upload
const upload: RequestHandler = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 1000000 }, // Limit file size to 1MB per file
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb); // Apply file type validation
    }
}).array('files', 5);

export default upload;
