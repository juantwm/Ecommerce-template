import { Request, Response } from 'express';
import { Prisma } from '@prisma/client'; 
import prisma from '../lib/prisma'; // Sin llaves, porque es export default donde tengas tu instancia de prismaClient

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { guestName, guestEmail, items } = req.body; 
    // items espera ser: [{ productId: 1, quantity: 2 }, ...]

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    // 🔥 INICIO DE LA TRANSACCIÓN
    // Todo lo que pase aquí dentro es "todo o nada".
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        let total = 0;
      const orderItemsData = [];

      // 1. Recorremos cada ítem solicitado
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        });

        if (!product) {
          throw new Error(`Producto con ID ${item.productId} no encontrado`);
        }

        // 2. Verificamos Stock
        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.name}. Disponible: ${product.stock}`);
        }

        // 3. Descontamos el Stock (Actualizamos la BD)
        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity }
        });

        // 4. Calculamos precio (Usamos el precio de la BD, no del frontend)
        const subtotal = product.price * item.quantity;
        total += subtotal;

        // Preparamos los datos para crear el OrderItem después
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price // Guardamos el precio histórico
        });
      }

      // 5. Creamos la Orden con sus Items
      const order = await tx.order.create({
        data: {
          guestName,
          guestEmail,
          total,
          status: 'COMPLETED', // O 'PENDING' si fueras a integrar pagos reales
          items: {
            create: orderItemsData
          }
        },
        include: { items: true } // Devolvemos la orden con sus items
      });

      return order;
    });

    // Si todo salió bien:
    res.status(201).json(result);

  } catch (error: any) {
    // Si algo falló (stock, db, etc), Prisma deshace todos los cambios automáticamente.
    console.error("Error al crear orden:", error.message);
    res.status(400).json({ error: error.message || "Error procesando la compra" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await prisma.order.findMany({
        orderBy: {
          createdAt: 'desc', // Las más nuevas primero
        },
        include: {
          items: {
            include: {
              product: true // ¡Truco! Traemos también el nombre y foto del producto
            }
          }
        }
      });
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las órdenes" });
    }
  };