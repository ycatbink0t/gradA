import { Pool } from 'pg';
import { paramsToInsert, paramsToSetById, paramsToWhereEqual } from '../db/utils';

export interface IModel {
    [key: string]: string | number | undefined;
}

function modelBuilder<X extends IModel, T extends Pool>(pool: T, tableName: string) {
    return class Model {
        constructor() {
            throw new Error('Class Profile is static');
        }

        static async get(params: Partial<X>): Promise<X[] | null> {
            const [where, values] = paramsToWhereEqual(params);
            const sql = 'SELECT * FROM ' + tableName + ' ' + where;

            const { rows } = await pool.query<X>(sql, values);

            return rows.length > 0
                ? rows
                : null;
        }

        static async patch(params: Partial<X> & { id: number }): Promise<X> {
            const [set, values] = paramsToSetById(params);

            const sql = 'UPDATE ' + tableName + ' ' + set + ' RETURNING *';

            const { rows } = await pool.query<X>(sql, values);

            return rows[0]
        }

        static async put(params: X): Promise<X> {
            const [insert, values] = paramsToInsert(params);
            const sql = `INSERT INTO ${tableName} ${insert} RETURNING *`;

            const { rows } = await pool.query<X>(sql, values);
            return rows[0];
        }

        static async delete(id: number): Promise<void> {
            const sql = `DELETE FROM ${tableName} WHERE ID = $1`;
            await pool.query(sql, [id]);
            return;
        }
    }
}

export { modelBuilder };
