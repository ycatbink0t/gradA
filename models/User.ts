import pool from '../db';
// import { paramsToSetById, paramsToWhereEqual } from '../db/utils';
import { IPrimitives, modelBuilder, ModelConfig } from '../utils/ModelBuilder';

export interface IUser extends IPrimitives{
    id?: number,
    email: string,
    username: string,
    password: string,
    profile_id?: number,
}

const config: ModelConfig<IUser> = {
    tableName: 'public.user'
};

const User = modelBuilder(pool, config);

/* class User {
    constructor() {
        throw new Error('Class User is static');
    }

    static async get(params: Partial<IUser>): Promise<IUser[] | null> {
        const [where, values] = paramsToWhereEqual(params);

        const sql = 'SELECT * FROM public.user ' + where;

        const { rows } = await pool.query<IUser>(sql, values);

        return rows.length > 0
            ? rows
            : null;
    }

    static async patch(params: Partial<IUser>): Promise<IUser> {
        const [set, values] = paramsToSetById(params);

        const sql = 'UPDATE public.user ' + set + ' RETURNING *';

        const { rows } = await pool.query<IUser>(sql, values);

        return rows[0];
    }

    static async put(params: IUser): Promise<IUser> {
        const sql = `INSERT INTO public.user (email, username, password) VALUES ($1, $2, $3) RETURNING *`;

        const { rows } = await pool.query<IUser>(sql, [params.email, params.username, params.password]);

        return rows[0];
    }
} */

export default User;
