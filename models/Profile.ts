import pool from '../db';
import { paramsToSetByIdString, paramsToWhereEqualString } from '../db/utils';

export interface IProfile {
    id?: number,
    name: string,
    surname: string,
    city: string,
    country: string,
    user_id: number,
    info: string,
}

class Profile {
    constructor() {
        throw new Error('Class Profile is static');
    }

    static async get(params: Partial<IProfile>): Promise<IProfile[] | null> {
        const [where, values] = paramsToWhereEqualString(params);

        const sql = 'SELECT * FROM profile ' + where;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, values);
        }
        const { rows } = await pool.query<IProfile>(sql, values);

        return rows.length > 0
            ? rows
            : null;
    }

    static async patch(params: Partial<IProfile>): Promise<IProfile> {
        const [set, values] = paramsToSetByIdString(params);

        const sql = 'UPDATE profile ' + set;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, values);
        }
        const { rows } = await pool.query<IProfile>(sql, values);

        return rows[0]
    }

    static async put(user_id: number): Promise<IProfile> {
        const sql = `INSERT INTO profile('user_id') VALUES ($1)`;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, user_id);
        }
        const { rows } = await pool.query<IProfile>(sql, [user_id]);
        return rows[0];
    }
}

export default Profile;
