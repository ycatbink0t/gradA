import pool from '../db';
import { IModel, modelBuilder } from '../utils/ModelBuilder';

export interface IUser extends IModel{
    id?: number,
    email: string,
    username: string,
    password: string,
    profile_id?: number,
}

const User = modelBuilder<IUser, typeof pool>(pool, 'public.user');

export default User;
