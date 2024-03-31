/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { router as userRouter } from './routes/userRouter.js';
import { globalErrorHandler } from './controllers/errorController.js';

dotenv.config();

const app = express();

// MIDDLEWARE ===================

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// built-in
app.use(express.json());
app.use(cors());

// custom global middleware
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Hello from Middleware!!!');
  
  next();
});

// CONTROLLERS=========================

// check server health
app.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'success',
    msg: 'pong!',
    test: null,
  });
});

// ROUTES==================
const pathPrefix = '/api/v1';

app.use(`${pathPrefix}/users`, userRouter);

// Handle not found error

app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Oops! Resource not found'
  })
});

app.use(globalErrorHandler);

// Server init
// const port = process.env.PORT ? +process.env.PORT : 3001;
const port = +process.env.PORT;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running on port ${port}`);
});
