import { Pool } from 'pg';
import { db } from '../config.json';

const pool = new Pool(db);

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});

export default pool;
