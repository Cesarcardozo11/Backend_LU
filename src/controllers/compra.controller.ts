// CONTROLADOR de compras: lee la petición, llama al modelo y responde con un código HTTP.
// Mismo patrón que producto.controller.ts (ver sus comentarios).
import { Request, Response } from 'express';
import { CompraModel } from '../models/compra.model';

export class CompraController {
  static async obtenerTodos(req: Request, res: Response) {
    try {
      const compras = await CompraModel.obtenerTodos();
      res.json({
        success: true,
        data: compras,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las compras',
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

      const compra = await CompraModel.obtenerPorId(id);
      if (!compra) {
        return res.status(404).json({
          success: false,
          message: 'Compra no encontrada',
        });
      }

      res.json({
        success: true,
        data: compra,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la compra',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async crear(req: Request, res: Response) {
    try {
      const nuevaCompra = await CompraModel.crear(req.body);
      res.status(201).json({
        success: true,
        data: nuevaCompra,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la compra',
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

      const compraActualizada = await CompraModel.actualizar(id, req.body);
      if (!compraActualizada) {
        return res.status(404).json({
          success: false,
          message: 'Compra no encontrada',
        });
      }

      res.json({
        success: true,
        data: compraActualizada,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar la compra',
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

      const eliminado = await CompraModel.eliminar(id);
      if (!eliminado) {
        return res.status(404).json({
          success: false,
          message: 'Compra no encontrada',
        });
      }

      res.json({
        success: true,
        message: 'Compra eliminada',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar la compra',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}