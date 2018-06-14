import pg from 'pg';

const url = 'postgres://nzjvbomfipcswh:b7409947d9d8c7eb5f34bb04e73878011697db8f04cccf222d09e52bd521cc53@ec2-54-243-54-6.compute-1.amazonaws.com:5432/dbkq5kcak88iek?ssl=true'

const pool = new pg.Pool({
  connectionString: url
})


export default pool;
