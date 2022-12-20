import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import usersRouter from './router/users';
import cardsRouter from './router/cards';
import errorHandler from './middlewares/errorHandler';
import authHandler from './middlewares/auth';
import { createUser, loginUser } from './controllers/users';

import { errorLogger, requestLogger } from './middlewares/logger';
import {
  createUserValidator,
  loginUserValidator,
} from './middlewares/validators';

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginUserValidator, loginUser);

app.use(authHandler);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('server running on', PORT);
});
