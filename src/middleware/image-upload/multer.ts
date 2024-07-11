import multer from "multer"
import path from 'path';
import { RequestHandler} from 'express';
import { S3Client} from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import nconf from '../../config/index';

// Get environment from configuration, default to 'development'
const env = nconf.get('NODE_ENV') || 'development';
const db = nconf.get(`db`);
const dbEnvConfig = db[env]

const s3 = new S3Client({
    region:  nconf.get(dbEnvConfig.aws_region),
    credentials: {
        accessKeyId: nconf.get(dbEnvConfig.aws_access_key_id),
        secretAccessKey: nconf.get(dbEnvConfig.aws_secret_access_key)
    }
});

const bucketName = nconf.get(dbEnvConfig.aws_bucket_name);

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

// Initialize multer and multerS3 for storage middleware for file upload
const upload: RequestHandler = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 1000000 }, // Limit file size to 1MB per file
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb); // Apply file type validation
    }
}).array('files', 5);

export default upload;
