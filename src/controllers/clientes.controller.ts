import { Request, Response } from 'express';
import { ClienteModel } from '../models/cliente.model';
import logger from '../utils/logger';

// Ahora los modelos consultan la base de datos, que puede fallar.
// Por eso cada función tiene try/catch y responde 500 si algo sale mal.
const errorServidor = (res: Response, error: unknown) => {
  logger.log('Error en clientes:', error);
  res.status(500).json({
    message: 'Error interno del servidor'
  });
};

export const obtenerClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await ClienteModel.obtenerTodos();

    res.json(clientes);
  } catch (error) {
    errorServidor(res, error);
  }
};

export const obtenerClientePorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const cliente = await ClienteModel.obtenerPorId(id);

    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    res.json(cliente);
  } catch (error) {
    errorServidor(res, error);
  }
};

export const crearCliente = async (req: Request, res: Response) => {
  try {
    const cliente = await ClienteModel.crear(req.body);

    res.status(201).json(cliente);
  } catch (error) {
    errorServidor(res, error);
  }
};

export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const cliente = await ClienteModel.actualizar(id, req.body);

    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    res.json(cliente);
  } catch (error) {
    errorServidor(res, error);
  }
};

export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const eliminado = await ClienteModel.eliminar(id);

    if (!eliminado) {
      return res.status(404).json({
        message: 'Cliente no encontrado'
      });
    }

    res.status(204).send();
  } catch (error) {
    errorServidor(res, error);
  }
};
