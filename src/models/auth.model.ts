// MODELO de autenticación: busca al usuario para el login y crea usuarios en el registro.
// Nunca devuelve la contraseña al frontend.
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

  static async registrar(cliente: Cliente): Promise<LoginResponse> {
    // El email no se puede repetir: si ya existe, no se registra
    const existe = await pool.query('SELECT id FROM clientes WHERE email = $1', [cliente.email]);

    if (existe.rows.length > 0) {
      return {
        success: false,
        message: 'Ya existe un usuario con ese email'
      };
    }

    // Se guarda el nuevo cliente y se devuelve sin la contraseña
    const result = await pool.query(
      `INSERT INTO clientes (nombre, apellido, edad, sexo, email, password)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, apellido, edad, sexo, email, fecha_creacion`,
      [cliente.nombre, cliente.apellido, cliente.edad, cliente.sexo, cliente.email, cliente.password]
    );

    return {
      success: true,
      message: 'Usuario registrado',
      user: result.rows[0]
    };
  }
}
