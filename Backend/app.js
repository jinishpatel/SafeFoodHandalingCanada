/** @format */

import express from 'express';
const app = express();

import cookieParser from 'cookie-parser';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

import user from './routes/userRoutes.js';
app.use('/user', user);

export default app;
