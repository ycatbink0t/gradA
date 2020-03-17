import pool from '../db';

const userStub = {
    name: 'Serhii',
    surname: 'Pylypchuk',
    email: 'stub@email.com',
    username: 'zalupa',
    password: 'dupa'
};

export interface IUser {
    id?: number,
    email?: string,
    username?: string,
    password?: string,
    profile_id?: number,
}

class User {
    constructor(
        private userParams: IUser) {}
    static async get(params: IUser): Promise<User | undefined> {
        const conn = await pool.connect();
        const result = await conn.query<IUser>('');
        const user = result.rows[0];
        conn.release();
        return user
            ? new User(user)
            : undefined;
    }
}

export default User;
