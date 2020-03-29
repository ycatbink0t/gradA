import pool from '../db';
import { IModel, modelBuilder } from '../utils/ModelBuilder';

export interface IGroupPermission extends IModel {
    id?: number,
    permission_id: number,
    group_id: number
}

const GroupPermission = modelBuilder<IGroupPermission, typeof pool>(pool, 'public.group_permission');

export default GroupPermission;
