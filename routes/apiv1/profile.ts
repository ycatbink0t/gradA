import { Router } from 'express';
import { profileController } from '../../controllers/profile';

const profileRouter = Router();

profileRouter.get('/:id', profileController.getById);
profileRouter.get('/', profileController.get);

export { profileRouter };
