import pg from 'pg';
const connection =process.env.DATABASE_URL || 'postgresql://postgres:uwahope007@localhost:5432/mtracker'

const pool = new pg.Pool(config);



export default pool;
