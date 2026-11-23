import { Request, Response } from 'express';
import { ProductoModel } from '../models/producto.model';

export class ProductoController {
  static async obtenerTodos(req: Request, res: Response) {
    try {
      const productos = await ProductoModel.obtenerTodos();
      res.json({
        success: true,
        data: productos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener los productos',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async obtenerPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      const producto = await ProductoModel.obtenerPorId(id);
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
        });
      }

      res.json({
        success: true,
        data: producto,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el producto',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async crear(req: Request, res: Response) {
    try {
      const nuevoProducto = await ProductoModel.crear(req.body);
      res.status(201).json({
        success: true,
        data: nuevoProducto,
      });
    } catch (error) {
      // 23505 es el código de PostgreSQL para "valor repetido" (el código del producto es UNIQUE)
      if ((error as { code?: string }).code === '23505') {
        return res.status(409).json({
          success: false,
          message: 'Ya existe un producto con ese código',
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error al crear el producto',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      const productoActualizado = await ProductoModel.actualizar(id, req.body);
      if (!productoActualizado) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
        });
      }

      res.json({
        success: true,
        data: productoActualizado,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el producto',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      const eliminado = await ProductoModel.eliminar(id);
      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
        });
      }

      res.json({
        success: true,
        message: 'Producto eliminado',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el producto',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}