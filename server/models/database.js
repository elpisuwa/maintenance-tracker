import pg from 'pg';
// import config from '../../config';
// const connection =process.env.DATABASE_URL || 'postgresql://postgres:uwahope007@localhost:5432/mtracker'

// const pool = new pg.Pool(con);
const { DATABASE_URL } = process.env;

const pool = new pg.Pool({
  connectionString: DATABASE_URL
});


export default pool;
