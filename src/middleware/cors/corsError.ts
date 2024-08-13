import { Request, Response, NextFunction } from 'express';

// Error handling middleware
/* eslint-disable @typescript-eslint/no-unused-vars */ // we need this because https://github.com/expressjs/generator/issues/78#issuecomment-103152636
const corsError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS error: not allowed' });
  } else {
    console.log(res, 'res');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default corsError;
