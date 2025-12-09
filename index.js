import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';

import connectDB from './database/connectDB.js';
import homeController from './controllers/home.controller.js';
import usersRouter from './routes/users.router.js';
import requestLogger from './middlewares/requestLogger.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(requestLogger);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

app.get('/', homeController);
app.use('/users', usersRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server up and running at http://${HOST}:${PORT}`);
});
