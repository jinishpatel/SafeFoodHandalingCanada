/** @format */

import express from 'express';
const app = express();
app.use(express.json());
import cookieParser from 'cookie-parser';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

import user from './routes/userRoutes.js';
app.use('/api/v1', user);

export default app;
