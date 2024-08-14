import { Request, Response, NextFunction } from 'express';

// Error handling middleware
const corsError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS error: not allowed' });
  }

  // Pass the error to the next error handler if it's not a CORS error
  next(err);
};

export default corsError;
