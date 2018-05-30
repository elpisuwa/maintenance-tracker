import pg from 'pg';
//import config from '../../config';
const connection =process.env.DATABASE_URL || 'postgresql://postgres:uwahope007@localhost:5432/mtracker'

const pool = new pg.Pool(connection);



export default pool;
