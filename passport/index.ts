import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

const userStub = {
    name: 'Serhii',
    surname: 'Pylypchuk',
    username: 'zalupa',
    password: 'dupa'
};

passport.use('local', new LocalStrategy(
    (username, password, done) => {
        if (username === userStub.username && password == userStub.password) {
            done(null, userStub);
        } else {
            done(null, false, { message: 'Incorrect username or password'});
        }
    }
));

passport.serializeUser((user: any, done: (error: null | Error, user: any) => void): void => {
    done(null, user);
});

passport.deserializeUser((user: any, done: (error: null | Error, user: any) => void): void => {
    done(null, user);
});

function mustAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return res.status(HttpStatus.UNAUTHORIZED).send({});
    }
    return next();
}

export { mustAuthenticated };
export default passport;
