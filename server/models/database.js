import pg from 'pg';
//import config from '../../config';
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:uwahope007@localhost:5432/mtracker';
const pool = new pg.Pool(connectionString);



export default pool;
