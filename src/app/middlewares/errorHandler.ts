import { ErrorRequestHandler } from 'express';


// errror validation
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(400).json({
    message: 'Validation failed',
    success: false,
    error: err,
  });
};
