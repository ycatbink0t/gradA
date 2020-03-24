import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config.json';
import Profile, { IProfile } from '../models/Profile';

export interface NewUser {
    email: string,
    password: string,
    username: string,
}

async function singUpController(newUser: NewUser): Promise<IUser> {
    const password = await bcrypt.hash(newUser.password, saltRounds);
    let user = await User.put({...newUser, password});
    let profile: IProfile;
    if (user.id) {
        profile = await Profile.put({
            info: '', name: '', surname: '',
            city: '',
            country: '',
            user_id: user.id,
        });
        user = await User.patch({profile_id: profile.id, id: user.id});
    }
    return user;
}

export { singUpController }
