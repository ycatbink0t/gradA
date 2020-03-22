import { Request, Response } from 'express';
import Profile, { IProfile } from '../models/Profile';
import HttpStatus from 'http-status-codes'

const profileController = {
    async get(req: Request, res: Response<IProfile | IProfile[]>) {
        if (req.query['me']) {
            // @ts-ignore
            const profile = await Profile.get({user_id: req.user.id});
            if (profile as IProfile[] && profile?.length) {
                res.send(profile[0]);
            } else {
                res.send();
            }
        }
        else {
            const profiles = await Profile.get(req.params);
            if (profiles) {
                res.send(profiles);
            } else
                res.status(HttpStatus.NO_CONTENT).send();
        }
    },

    async getById(req: Request, res: Response<IProfile>) {
        const profile = await Profile.get({id: +req.params.id});
        if (profile?.length) {
            res.send(profile[0]);
        } else {
            res.status(HttpStatus.NO_CONTENT).send();
        }
    }
};

export { profileController };
