import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config.json';
import Profile, { IProfile } from '../models/Profile';
import Group, { IGroup }  from '../models/Group';
import UserGroup from '../models/UserGroup';
import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

export interface NewUser {
    email: string,
    password: string,
    username: string,
    group: string,
}

async function singUpController(req: Request, res: Response): Promise<void> {
    const newUser = req.body as NewUser;
    const password = await bcrypt.hash(newUser.password, saltRounds);
    const {group, ...info} = newUser;
    let user = await User.put({...info, password});
    let profile: IProfile;
    if (user.id) {
        profile = await Profile.put({
            info: '', name: '', surname: '',
            city: '',
            country: '',
            user_id: user.id,
        });
        const groups = await Group.get({name: group});
        user = await User.patch({profile_id: profile.id, id: user.id});
        const userWithGroup: IUser & { groups?: IGroup[]} = user;
        if (groups?.length && groups[0].id && user.id) {
            await UserGroup.put({group_id: groups[0].id, user_id: user.id});
            userWithGroup.groups = groups;
        }
        res.status(HttpStatus.CREATED).send(userWithGroup);
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

export { singUpController }
