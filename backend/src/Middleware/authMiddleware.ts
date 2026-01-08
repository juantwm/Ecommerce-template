import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secretodefault';

// Extendemos la interfaz Request para poder guardar el usuario decodificado
export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Recuperar el header "Authorization: Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Tomamos la parte del token

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado: Falta el token' });
    }

  // 2. Verificar el token
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
        }

        // 3. Si todo ok, guardamos el usuario en la request y pasamos
        req.user = user;
        next();
    });
};