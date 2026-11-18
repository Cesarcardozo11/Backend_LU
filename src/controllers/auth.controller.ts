import type { Request, Response } from 'express';
import { AuthModel } from '../models/auth.model';
import logger from '../utils/logger';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email y contraseña son requeridos'
        });
        return;
      }

      const result = await AuthModel.login(email, password);

      if (!result.success) {
        res.status(401).json(result);
        return;
      }

      logger.log(`Login exitoso para: ${email}`);
      res.status(200).json(result);
    } catch (error) {
      logger.log('Error en login:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
}
