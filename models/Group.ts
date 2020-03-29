import pool from '../db';
import { IModel, modelBuilder } from '../utils/ModelBuilder';

export interface IGroup extends IModel{
    id?: number,
    name: string,
    description: string
}

const Group = modelBuilder<IGroup, typeof pool>(pool, 'public.group');

export default Group;
