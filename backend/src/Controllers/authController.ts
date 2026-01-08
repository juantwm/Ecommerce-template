import { Request, Response } from 'express';
import prisma from '../lib/prisma'; // Asegúrate de que este archivo exporte tu instancia de prisma
import { hashPassword, comparePassword, generateToken } from '../lib/auth';

// REGISTRO
export const register = async (req: Request, res: Response) => {
    try 
    {
        const { email, password, name } = req.body;

    // 1. Verificar si ya existe
        const existingUser = await prisma.user.findUnique({ where: { gmail: email } });
    if (existingUser) 
    {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // 2. Encriptar contraseña
    const hashedPassword = await hashPassword(password);

    // 3. Crear usuario
    const user = await prisma.user.create({
        data: {
        gmail: email,
        name: name,
        password: hashedPassword,
        role: 'USER' // Por defecto todos son usuarios normales
        }
    });

    // 4. Responder (OJO: No devolvemos la contraseña)
    res.status(201).json({ message: 'Usuario creado', userId: user.id });

    } 
    catch (error) 
    {
    res.status(500).json({ error: 'Error en el registro' });
    }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
    try 
    {
        const { email, password } = req.body;

    // 1. Buscar usuario
    const user = await prisma.user.findUnique({ where: { gmail: email } });
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 2. Comparar contraseña encriptada
    const isValid = await comparePassword(password, user.password);
    if (!isValid) 
    {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generar Token
    const token = generateToken(user.id, user.role);

    // 4. Enviar token al cliente
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });

    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error en el login' });
    }
};