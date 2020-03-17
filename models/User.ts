import pool from '../db';
import { paramsToSetByIdString, paramsToWhereEqualString } from '../db/utils';

export interface IUser {
    id: number,
    email: string,
    username: string,
    password: string,
    profile_id: number,
}

class User {
    static async get(params: Partial<IUser>): Promise<IUser[] | null> {
        const [where, values] = paramsToWhereEqualString(params);

        const sql = 'SELECT * from user ' + where;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, values);
        }
        const conn = await pool.connect();
        const { rows } = await conn.query<IUser>(sql, values);
        conn.release();

        return rows.length > 0
            ? rows
            : null;
    }

    static async patch(params: Partial<IUser>): Promise<IUser | null> {
        const [set, values] = paramsToSetByIdString(params);

        const sql = 'UPDATE user ' + set;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, values);
        }
        const conn = await pool.connect();
        const { rows } = await pool.query<IUser>(sql, values);
        conn.release();

        return rows.length === 1
            ? rows[0]
            : null;
    }
}

export default User;
