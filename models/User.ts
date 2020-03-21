import pool from '../db';
import { paramsToSetByIdString, paramsToWhereEqualString } from '../db/utils';

export interface IUser {
    id?: number,
    email: string,
    username: string,
    password: string,
    profile_id?: number,
}

class User {
    constructor() {
        throw new Error('Class User is static');
    }

    static async get(params: Partial<IUser>): Promise<IUser[] | null> {
        const [where, values] = paramsToWhereEqualString(params);

        const sql = 'SELECT * FROM user ' + where;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, values);
        }
        const { rows } = await pool.query<IUser>(sql, values);

        return rows.length > 0
            ? rows
            : null;
    }

    static async patch(params: Partial<IUser>): Promise<IUser> {
        const [set, values] = paramsToSetByIdString(params);

        const sql = 'UPDATE user ' + set;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, values);
        }
        const { rows } = await pool.query<IUser>(sql, values);

        return rows[0];
    }

    static async put(params: IUser): Promise<IUser> {
        const sql = `INSERT INTO user('email', 'username', 'password') VALUES ($1, $2, $3)`;
        if (process.env.NODE_ENV === 'dev') {
            console.log(sql, params);
        }

        const { rows } = await pool.query<IUser>(sql, [params.email, params.username, params.password]);

        return rows[0];
    }
}

export default User;
