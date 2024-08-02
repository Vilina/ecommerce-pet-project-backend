import { RequestHandler } from 'express';
import upload from './multer';

// Middleware to handle multer errors
const uploadS3: RequestHandler = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res
        .status(500)
        .json({ error: 'Error uploading files', details: err.message });
    }
    next();
  });
};

export default uploadS3;
