import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config.json';
import Profile, { IProfile } from '../models/Profile';

export interface NewUser {
    email: string,
    password: string,
    username: string,
    group: string
}

async function singUpController(newUser: NewUser): Promise<IUser> {
    const password = await bcrypt.hash(newUser.password, saltRounds);
    let user: IUser;
    let profile: IProfile;
    try {
        user = await User.put({...newUser, password});
        profile = await Profile.put(user.id as number);
        user = await User.patch({profile_id: profile.id, id: user.id});
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
    return user;
}

export { singUpController }
