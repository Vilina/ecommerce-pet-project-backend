import { Request, Response } from 'express';

// Error handling middleware
const corsError = (err: any, req: Request, res: Response) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS error: not allowed' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default corsError;
