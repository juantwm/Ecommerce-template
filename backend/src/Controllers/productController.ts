import { Request, Response } from 'express';
// Importa tu instancia de prisma (ajusta la ruta según donde creaste el singleton en el paso anterior)
import prisma from '../lib/prisma';

export const getProducts = async (req: Request, res: Response) => {
    try
    {
        // 1. Extraemos 'categoryId' de la query string (ej: /products?categoryId=1)
            const { categoryId } = req.query;

        // 2. Construimos el filtro dinámicamente
        // Si existe categoryId, filtramos por él. Si no, traemos todo (objeto vacío).
        const whereClause = categoryId ? { categoryId: Number(categoryId) } : {};

        const products = await prisma.product.findMany({
            where: whereClause,
            include: {
            category: true // ¡Tip Pro! Esto hace un "JOIN" y te trae el nombre de la categoría junto al producto
        }
        });

        res.json(products);
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try 
    {
        const { id } = req.params; // Viene de la URL: /products/:id
        const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: { category: true }
        });

        if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try 
    {
        // Extraemos los datos del cuerpo de la petición (JSON)
        const { name, description, price, stock, categoryId, images } = req.body;

        // Validación básica (Podrías usar Zod aquí más adelante)
        if (!name || !price || !categoryId) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const newProduct = await prisma.product.create({
            data: {
            name,
            description,
            price,
            stock,
            images: images || [], // Si no mandan imágenes, array vacío
            categoryId: Number(categoryId) // Aseguramos que sea número
            },
        });

        res.status(201).json(newProduct);
    } 
    catch (error) 
    {
        console.error(error); // Para que veas el error en tu consola
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try 
    {
        const { id } = req.params;
        const data = req.body;

        const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: data, // Prisma es inteligente y solo actualiza los campos que envíes
        });

        res.json(updatedProduct);
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try 
    {
        const { id } = req.params;
        await prisma.product.delete({
        where: { id: Number(id) },
        });
        res.json({ message: 'Producto eliminado correctamente' });
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};