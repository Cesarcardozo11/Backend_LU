// CONTROLADOR = lee la petición, valida, llama al modelo y responde con un código HTTP.
// Request = la petición (req) | Response = la respuesta (res)
import { Request, Response } from 'express';
import { ProductoModel } from '../models/producto.model';

// static = las funciones se usan desde la clase directamente: ProductoController.crear
// async = la función espera resultados (la base de datos tarda un poco en responder)
export class ProductoController {
  static async obtenerTodos(req: Request, res: Response) {
    // try / catch = "intenta esto; si algo falla, maneja el error sin que se caiga el servidor"
    try {
      // await = espera a que el modelo termine la consulta
      const productos = await ProductoModel.obtenerTodos();
      // res.json = responde con JSON. Sin status → 200 (todo bien)
      res.json({
        success: true,
        data: productos,
      });
    } catch (error) {
      // 500 = error del servidor
      res.status(500).json({
        success: false,
        message: 'Error al obtener los productos',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  static async obtenerPorId(req: Request, res: Response) {
    try {
      // req.params.id = el número que viene en la URL (/productos/3 → "3").
      // parseInt = convierte el texto "3" en el número 3
      const id = parseInt(req.params.id, 10);
      // isNaN = "no es un número" → 400 = la petición trae datos incorrectos
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID inválido',
        });
      }

      const producto = await ProductoModel.obtenerPorId(id);
      // 404 = no existe
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
      // req.body = los datos que envió el frontend (el formulario)
      const nuevoProducto = await ProductoModel.crear(req.body);
      // 201 = creado
      res.status(201).json({
        success: true,
        data: nuevoProducto,
      });
    } catch (error) {
      // 23505 es el código de PostgreSQL para "valor repetido" (el código del producto es UNIQUE)
      // 409 = conflicto (algo repetido)
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

      // El modelo devuelve true si borró la fila, false si no existía
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
