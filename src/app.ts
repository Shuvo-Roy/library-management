import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRoutes from './app/routes/book.routes';
import borrowRoutes from './app/routes/borrow.routes';
import { errorHandler } from './app/middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use(errorHandler);

export default app;
