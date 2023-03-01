import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import bcrypt from 'bcryptjs';

const salt = 10;

export type PayloadToken = {
  email: string;
  role: string;
};

export class Auth {
  // Dentro de la clase auth creamos los métodos
  // Si hacemos un metodo estático se coge la clase directamente, punto, createJWT. no hace falta instanciar la clase auth para poder aplicar los métodos que tiene dentro. No va a funcionar porque aqui son estáticos:

  static createJWT(payLoad: PayloadToken) {
    if (!config.jwtSecret) return; // Esto es una guarda que no deja pasar a la siguiente linea si no se tiene el tipo correcto
    return jwt.sign(payLoad, config.jwtSecret as string); // Esto devuelve un string
  }

  static verifyJWT(token: string) {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string') throw new Error('Invalid payload');
    return result;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
