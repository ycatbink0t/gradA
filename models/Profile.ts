import pool from '../db';
// import { paramsToSetById, paramsToWhereEqual } from '../db/utils';
import { IPrimitives, modelBuilder, ModelConfig } from '../utils/ModelBuilder';

export interface IProfile extends IPrimitives{
    id?: number,
    name: string,
    surname: string,
    city: string,
    country: string,
    user_id: number,
    info: string,
}

const config: ModelConfig<IProfile> = {
    tableName: 'public.profile',
};

const Profile = modelBuilder(pool, config);

/* class Profile {
    constructor() {
        throw new Error('Class Profile is static');
    }

    static async get(params: Partial<IProfile>): Promise<IProfile[] | null> {
        const [where, values] = paramsToWhereEqual(params);
        const sql = 'SELECT * FROM public.profile ' + where;

        const { rows } = await pool.query<IProfile>(sql, values);

        return rows.length > 0
            ? rows
            : null;
    }

    static async patch(params: Partial<IProfile>): Promise<IProfile> {
        const [set, values] = paramsToSetById(params);

        const sql = 'UPDATE public.profile ' + set + ' RETURNING *';

        const { rows } = await pool.query<IProfile>(sql, values);

        return rows[0]
    }

    static async put(user_id: number): Promise<IProfile> {
        const sql = `INSERT INTO public.profile (user_id) VALUES ($1) RETURNING *`;

        const { rows } = await pool.query<IProfile>(sql, [user_id]);
        return rows[0];
    }
} */

export default Profile;
