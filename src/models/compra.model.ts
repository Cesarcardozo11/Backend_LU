import type { PoolClient } from 'pg';
import pool from '../config/db';

export interface Compra {
  id?: number;
  clienteId: number;
  clienteNombre?: string;
  fecha: Date;
  productos: CompraProducto[];
  total: number;
  estado: string;
}

export interface CompraProducto {
  productoId: number;
  codigo?: string;
  nombre?: string;
  cantidad: number;
  precio: number;
}

// Trae las compras con el nombre del cliente (JOIN) y les agrega sus productos.
// Se usan alias ("clienteId", etc.) para que el JSON quede igual que antes.
async function buscarCompras(id?: number): Promise<Compra[]> {
  const compras = await pool.query(
    `SELECT c.id, c.cliente_id AS "clienteId",
            cl.nombre || ' ' || cl.apellido AS "clienteNombre",
            c.fecha, c.total, c.estado
     FROM compras c
     JOIN clientes cl ON cl.id = c.cliente_id
     WHERE $1::int IS NULL OR c.id = $1
     ORDER BY c.id`,
    [id ?? null]
  );

  const detalle = await pool.query(
    `SELECT cp.compra_id, cp.producto_id AS "productoId", p.codigo, p.nombre, cp.cantidad, cp.precio
     FROM compra_productos cp
     JOIN productos p ON p.id = cp.producto_id
     WHERE $1::int IS NULL OR cp.compra_id = $1
     ORDER BY cp.id`,
    [id ?? null]
  );

  return compras.rows.map((compra) => ({
    ...compra,
    productos: detalle.rows
      .filter((d) => d.compra_id === compra.id)
      .map(({ compra_id, ...producto }) => producto),
  }));
}

// Inserta los productos de una compra en compra_productos
async function guardarProductos(conexion: PoolClient, compraId: number, productos: CompraProducto[]) {
  for (const p of productos) {
    await conexion.query(
      'INSERT INTO compra_productos (compra_id, producto_id, cantidad, precio) VALUES ($1, $2, $3, $4)',
      [compraId, p.productoId, p.cantidad, p.precio]
    );
  }
}

export class CompraModel {
  static async obtenerTodos(): Promise<Compra[]> {
    return buscarCompras();
  }

  static async obtenerPorId(id: number): Promise<Compra | null> {
    const compras = await buscarCompras(id);
    return compras[0] || null;
  }

  static async crear(compra: Compra): Promise<Compra> {
    // Una compra se guarda en dos tablas. Con BEGIN/COMMIT se guardan las dos o ninguna.
    const conexion = await pool.connect();
    try {
      await conexion.query('BEGIN');
      const result = await conexion.query(
        `INSERT INTO compras (cliente_id, fecha, total, estado)
         VALUES ($1, COALESCE($2, CURRENT_DATE), $3, $4)
         RETURNING id`,
        [compra.clienteId, compra.fecha, compra.total, compra.estado]
      );
      const id = result.rows[0].id;
      await guardarProductos(conexion, id, compra.productos || []);
      await conexion.query('COMMIT');
      return (await CompraModel.obtenerPorId(id)) as Compra;
    } catch (error) {
      await conexion.query('ROLLBACK');
      throw error;
    } finally {
      conexion.release();
    }
  }

  static async actualizar(id: number, compra: Compra): Promise<Compra | null> {
    const actual = await CompraModel.obtenerPorId(id);
    if (!actual) {
      return null;
    }

    const datos: Compra = { ...actual, ...compra };

    const conexion = await pool.connect();
    try {
      await conexion.query('BEGIN');
      await conexion.query(
        'UPDATE compras SET cliente_id = $1, fecha = $2, total = $3, estado = $4 WHERE id = $5',
        [datos.clienteId, datos.fecha, datos.total, datos.estado, id]
      );
      // Si mandan productos nuevos, se reemplazan los anteriores
      if (compra.productos) {
        await conexion.query('DELETE FROM compra_productos WHERE compra_id = $1', [id]);
        await guardarProductos(conexion, id, compra.productos);
      }
      await conexion.query('COMMIT');
      return CompraModel.obtenerPorId(id);
    } catch (error) {
      await conexion.query('ROLLBACK');
      throw error;
    } finally {
      conexion.release();
    }
  }

  static async eliminar(id: number): Promise<boolean> {
    // compra_productos se borra sola por el ON DELETE CASCADE
    const result = await pool.query('DELETE FROM compras WHERE id = $1', [id]);
    return result.rowCount === 1;
  }
}
