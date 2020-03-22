import { Router } from 'express';
import { profileRouter } from './profile';

const apiV1 = Router();

apiV1.use('/profile', profileRouter);

export { apiV1 };
