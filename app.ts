import express from 'express';
import config from './config.json';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { MemoryStore } from 'express-session';

import { mustAuthenticated, passport } from './passport';

import signup from './routes/signup';
import { apiV1 } from './routes/apiv1';

const app = express();
app.disable('x-powered-by');

const sessionMiddleware = session({
    secret: config.secret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: new MemoryStore(),
});

app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', mustAuthenticated, apiV1);
app.use('/signup', signup);
app.post('/login', passport.authenticate('local',
    { session: true }),
    (req, res) => {
        res.send(req.user);
    });
app.post('/logout', mustAuthenticated, (req, res) => {
    req.logOut();
    res.send({});
});

const server = app.listen(config.app.port, _ => {
    console.log('Server listening on port ', config.app.port);
});

process.on('uncaughtException', error => {
   console.error(error);
});

export default server;
