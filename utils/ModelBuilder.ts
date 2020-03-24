import { Pool } from 'pg';
import { paramsToInsert, paramsToSetById, paramsToWhereEqual } from '../db/utils';

export interface IPrimitives {
    [key: string]: string | number | undefined;
}

export interface ModelConfig<X extends IPrimitives> {
    tableName: string,
    _?: Partial<X>
}

function modelBuilder<T extends Pool, X extends IPrimitives>(pool: T, config: ModelConfig<X>) {
    return class Model {
        constructor() {
            throw new Error('Class Profile is static');
        }

        static async get(params: Partial<X>): Promise<X[] | null> {
            const [where, values] = paramsToWhereEqual(params);
            const sql = 'SELECT * FROM ' + config.tableName + ' ' + where;

            const { rows } = await pool.query<X>(sql, values);

            return rows.length > 0
                ? rows
                : null;
        }

        static async patch(params: Partial<X> & { id: number }): Promise<X> {
            const [set, values] = paramsToSetById(params);

            const sql = 'UPDATE ' + config.tableName + ' ' + set + ' RETURNING *';

            const { rows } = await pool.query<X>(sql, values);

            return rows[0]
        }

        static async put(params: X): Promise<X> {
            const [insert, values] = paramsToInsert(params);
            const sql = `INSERT INTO ${config.tableName} ${insert} RETURNING *`;

            const { rows } = await pool.query<X>(sql, values);
            return rows[0];
        }
    }
}

export { modelBuilder };
