import pool from '../config/db';
import type { Cliente } from './cliente.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: Omit<Cliente, 'password'>;
}

export class AuthModel {
  static async login(email: string, password: string): Promise<LoginResponse> {
    // Busca un cliente con ese email y contraseña (sin traer la contraseña)
    const result = await pool.query(
      `SELECT id, nombre, apellido, edad, sexo, email, fecha_creacion
       FROM clientes
       WHERE email = $1 AND password = $2`,
      [email, password]
    );

    const cliente = result.rows[0];

    if (!cliente) {
      return {
        success: false,
        message: 'Email o contraseña incorrectos'
      };
    }

    return {
      success: true,
      message: 'Login exitoso',
      user: cliente
    };
  }
}
