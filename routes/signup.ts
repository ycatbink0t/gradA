import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { singUpController, NewUser } from '../controllers/signup';
import HttpStatus from 'http-status-codes';

const router = Router();

router.post('', [
    check('email').isEmail(),
    check('username').isLength({ min: 6}),
    check('password').isLength({ min: 10 }),
    check('group').exists(),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ errors: errors.array() });
    } else {
        const user = await singUpController(req.body as NewUser);
        return res.status(HttpStatus.OK).send(user);
    }
});

export default router;
