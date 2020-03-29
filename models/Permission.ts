import pool from '../db';
import { IModel, modelBuilder } from '../utils/ModelBuilder';

export interface IPermission extends IModel{
    id?: number,
    name: string,
    description: string
}

const Permission = modelBuilder<IPermission, typeof pool>(pool, 'public.permission');

export default Permission;
