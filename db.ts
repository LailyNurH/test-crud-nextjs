// host: 'sql.freedb.tech',
//   user: 'freedb_db_laily',
//   password: 'v@E6hqR8V5E?wfd',
//   database: 'freedb_db_person',

import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool({
host: 'sql.freedb.tech',
  user: 'freedb_db_laily',
  password: 'v@E6hqR8V5E?wfd',
  database: 'freedb_db_person',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;