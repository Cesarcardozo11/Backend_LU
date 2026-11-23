// Script para crear las tablas y cargar los datos iniciales.
// Ejecuta database/schema.sql y luego database/seed.sql.
// Ejecutar con: npm run db:crear
// OJO: seed.sql vacía las tablas antes de cargar los datos.
import dotenv from 'dotenv';

dotenv.config();

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import pool from './config/db';

async function crear() {
  try {
    for (const archivo of ['schema.sql', 'seed.sql']) {
      const sql = readFileSync(join(process.cwd(), 'database', archivo), 'utf8');
      await pool.query(sql);
      console.log(`${archivo} ejecutado`);
    }
    console.log('Base de datos lista');
  } catch (error) {
    console.log('No se pudo crear la base:', error instanceof Error ? error.message : error);
  } finally {
    await pool.end();
  }
}

crear();
