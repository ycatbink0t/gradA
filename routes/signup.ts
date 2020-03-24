import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { singUpController, NewUser } from '../controllers/signup';
import HttpStatus from 'http-status-codes';

const router = Router();

router.post('', [
    body('email').isEmail(),
    body('username').isLength({ min: 6}),
    body('password').isLength({ min: 10 }),
    body('group').optional(),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.body);
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errors: errors.array() });
    } else {
        const user = await singUpController(req.body as NewUser);
        return res.status(HttpStatus.CREATED).send(user);
    }
});

export default router;
