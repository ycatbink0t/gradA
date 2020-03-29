import pool from '../db';
import { IModel, modelBuilder } from '../utils/ModelBuilder';

export interface IUserGroup extends IModel {
    id?: number,
    user_id: number,
    group_id: number
}

const UserGroup = modelBuilder<IUserGroup, typeof pool>(pool, 'public.user_group');

export default UserGroup;
