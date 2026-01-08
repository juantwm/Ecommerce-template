import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secretodefault';

// 1. Función para Encriptar contraseña (Hashing)
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10); // 10 rondas de sal, balance perfecto seguridad/velocidad
    return await bcrypt.hash(password, salt);
};

// 2. Función para Comparar contraseña (Login)
export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

// 3. Función para Generar el Token (JWT)
export const generateToken = (userId: number, role: string) => {
  // Guardamos el ID y el ROL dentro del token
    return jwt.sign({ id: userId, role }, SECRET, {
        expiresIn: '24h', // El token expira en 24 horas
    });
};