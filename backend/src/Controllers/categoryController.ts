import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

// GET: Obtener todas las categorías
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } } // Extra: Cuenta cuántos productos tiene
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

// POST: Crear una categoría
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });

    // Generar slug (ej: "Muebles de Oficina" -> "muebles-de-oficina")
    const slug = slugify(name, { lower: true, strict: true });

    const newCategory = await prisma.category.create({
      data: { name, slug }
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

// DELETE: Borrar categoría
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Convertimos el ID a número porque en Prisma es Int
    await prisma.category.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    // Si falla (ej: tiene productos asociados), Prisma tira error P2003
    res.status(400).json({ error: 'No se puede eliminar: Probablemente tiene productos asociados.' });
  }
};