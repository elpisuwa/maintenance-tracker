import pg from 'pg';
<<<<<<< HEAD
// import config from '../../config';
// const connection =process.env.DATABASE_URL || 'postgresql://postgres:uwahope007@localhost:5432/mtracker'

// const pool = new pg.Pool(con);
const { DATABASE_URL } = process.env;
=======
//import config from '../../config';
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:uwahope007@localhost:5432/mtracker';
const pool = new pg.Pool(connectionString);
>>>>>>> 1a272f1f33dec313642161e33cfbf911e5c75fbf

const pool = new pg.Pool({
  connectionString: DATABASE_URL
});


export default pool;
