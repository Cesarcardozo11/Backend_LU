// MODELO = el único que escribe SQL y habla con la base de datos.
// pool = la conexión a PostgreSQL (está en config/db.ts)
import pool from '../config/db';

// interface = la forma de un producto (igual a las columnas de la tabla)
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
  // Promise<Producto[]> = devolverá (más tarde) una lista de productos
  static async obtenerTodos(): Promise<Producto[]> {
    // pool.query = ejecuta SQL. SELECT * = traer todas las columnas. ORDER BY id = ordenar por id
    const result = await pool.query('SELECT * FROM productos ORDER BY id');
    // result.rows = las filas que devolvió la consulta
    return result.rows;
  }

  // Producto | null = devuelve un producto o null si no existe
  static async obtenerPorId(id: number): Promise<Producto | null> {
    // $1 = consulta parametrizada: el valor va aparte ([id]).
    // Así un texto malicioso nunca se ejecuta como SQL (evita la inyección SQL)
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    // rows[0] = la primera fila; || null = si no hay ninguna, devuelve null
    return result.rows[0] || null;
  }

  static async crear(producto: Producto): Promise<Producto> {
    // INSERT INTO = guardar una fila nueva.
    // RETURNING * = devuelve la fila recién guardada (con su id nuevo)
    const result = await pool.query(
      `INSERT INTO productos (codigo, nombre, categoria, dispositivo, precio, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      // Los valores van en el mismo orden que $1, $2, $3...
      [producto.codigo, producto.nombre, producto.categoria, producto.dispositivo, producto.precio, producto.stock]
    );
    return result.rows[0];
  }

  static async actualizar(id: number, producto: Producto): Promise<Producto | null> {
    // Primero se busca el producto actual
    const actual = await ProductoModel.obtenerPorId(id);
    if (!actual) {
      return null;
    }

    // { ...actual, ...producto } = spread: mezcla los datos viejos con los nuevos
    // (si un campo no viene en "producto", se conserva el de "actual")
    const datos: Producto = { ...actual, ...producto };

    // UPDATE ... SET = cambiar los valores de una fila existente
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
    // DELETE FROM = borrar filas
    const result = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    // rowCount = cuántas filas se borraron. Si fue 1 → true (se borró)
    return result.rowCount === 1;
  }
}
