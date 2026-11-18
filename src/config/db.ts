import { Pool } from 'pg';

// Pool = grupo de conexiones a PostgreSQL que se reutilizan en cada consulta.
// Los datos de conexión se leen del archivo .env
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'lulosa',
});

export default pool;
