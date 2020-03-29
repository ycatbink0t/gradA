import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { singUpController } from '../controllers/signup';
import HttpStatus from 'http-status-codes';

const router = Router();

router.post('', [
    body('email').isEmail(),
    body('username').isLength({ min: 6}),
    body('password').isLength({ min: 10 }),
    body('group').exists(),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errors: errors.array() });
    } else {
        singUpController(req, res);
        return;
    }
});

export default router;
