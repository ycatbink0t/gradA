import pool from '../db';
import { IModel, modelBuilder } from '../utils/ModelBuilder';

export interface IProfile extends IModel{
    id?: number,
    name: string,
    surname: string,
    city: string,
    country: string,
    user_id: number,
    info: string,
}

const Profile = modelBuilder<IProfile, typeof pool>(pool, 'public.profile');

export default Profile;
