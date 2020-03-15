import express from 'express';

const router = express.Router();

const userStub = {
    name: 'Serhii',
    surname: 'Pylypchuk',
};

router.route('')
    .get(((_req, res) => {
        res.send(userStub);
    }));

export default router;
