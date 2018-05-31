import pg from 'pg';

const { DATABASE_URL } = process.env;

//import config from '../../config';
const pool = new pg.Pool({
  connectionString: DATABASE_URL
});


export default pool;
