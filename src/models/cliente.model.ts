import pool from '../config/db';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  edad?: number;
  sexo?: string;
  email: string;
  password?: string;
  fecha_creacion?: Date;
}

// Columnas que se devuelven al frontend (nunca la contraseña)
const COLUMNAS = 'id, nombre, apellido, edad, sexo, email, fecha_creacion';

export class ClienteModel {

  static async obtenerTodos(): Promise<Cliente[]> {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM clientes ORDER BY id`);
    return result.rows;
  }

  static async obtenerPorId(id: number): Promise<Cliente | null> {
    const result = await pool.query(`SELECT ${COLUMNAS} FROM clientes WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  static async crear(cliente: Cliente): Promise<Cliente> {
    const result = await pool.query(
      `INSERT INTO clientes (nombre, apellido, edad, sexo, email, password)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING ${COLUMNAS}`,
      [cliente.nombre, cliente.apellido, cliente.edad, cliente.sexo, cliente.email, cliente.password]
    );
    return result.rows[0];
  }

  static async actualizar(id: number, cliente: Cliente): Promise<Cliente | null> {
    // Se busca el cliente actual (con contraseña) para mezclarlo con los datos nuevos
    const actual = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (actual.rows.length === 0) {
      return null;
    }

    const datos: Cliente = { ...actual.rows[0], ...cliente };

    const result = await pool.query(
      `UPDATE clientes
       SET nombre = $1, apellido = $2, edad = $3, sexo = $4, email = $5, password = $6
       WHERE id = $7
       RETURNING ${COLUMNAS}`,
      [datos.nombre, datos.apellido, datos.edad, datos.sexo, datos.email, datos.password, id]
    );
    return result.rows[0];
  }

  static async eliminar(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    return result.rowCount === 1;
  }
}
