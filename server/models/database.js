import pg from 'pg';
import config from '../../config';

const pool = new pg.Pool(config);



export default pool;
