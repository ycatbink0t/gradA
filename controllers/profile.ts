import { Request, Response } from 'express';
import Profile, { IProfile } from '../models/Profile';
import HttpStatus from 'http-status-codes'
import { IController } from './IController';
import controllerBuilder from '../utils/controllerBuilder';

const profileController: IController<IProfile> = controllerBuilder<IProfile>(Profile);
profileController.get = async (req: Request, res: Response<IProfile[]>) => {
    if (req.query['me'] && req.user) {

        const profile = await Profile.get({user_id: req.user.id});
        if (profile as IProfile[] && profile?.length) {
            res.send(profile);
        } else {
            res.send();
        }
    }
    else {
        const profiles = await Profile.get(req.query);
        if (profiles) {
            res.send(profiles);
        } else {
            res.status(HttpStatus.NO_CONTENT).send();
        }
    }
};

export { profileController };
