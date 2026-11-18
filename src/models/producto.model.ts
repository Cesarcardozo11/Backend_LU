import pool from '../config/db';

export interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  categoria: string;
  dispositivo: string;
  precio: number;
  stock: number;
}

export class ProductoModel {
  static async obtenerTodos(): Promise<Producto[]> {
    const result = await pool.query('SELECT * FROM productos ORDER BY id');
    return result.rows;
  }

  static async obtenerPorId(id: number): Promise<Producto | null> {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async crear(producto: Producto): Promise<Producto> {
    const result = await pool.query(
      `INSERT INTO productos (codigo, nombre, categoria, dispositivo, precio, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [producto.codigo, producto.nombre, producto.categoria, producto.dispositivo, producto.precio, producto.stock]
    );
    return result.rows[0];
  }

  static async actualizar(id: number, producto: Producto): Promise<Producto | null> {
    const actual = await ProductoModel.obtenerPorId(id);
    if (!actual) {
      return null;
    }

    const datos: Producto = { ...actual, ...producto };

    const result = await pool.query(
      `UPDATE productos
       SET codigo = $1, nombre = $2, categoria = $3, dispositivo = $4, precio = $5, stock = $6
       WHERE id = $7
       RETURNING *`,
      [datos.codigo, datos.nombre, datos.categoria, datos.dispositivo, datos.precio, datos.stock, id]
    );
    return result.rows[0];
  }

  static async eliminar(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    return result.rowCount === 1;
  }
}
