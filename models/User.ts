import pool from '../db';
import { IPrimitives, modelBuilder } from '../utils/ModelBuilder';

export interface IUser extends IPrimitives{
    id?: number,
    email: string,
    username: string,
    password: string,
    profile_id?: number,
}

const User = modelBuilder<IUser, typeof pool>(pool, 'public.user');

export default User;
