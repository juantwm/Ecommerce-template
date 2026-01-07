import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan'; // <--- NUEVO
import { PrismaClient } from '@prisma/client';
import productRoutes from './Routes/productRoutes';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev')); // <--- NUEVO: Nos muestra logs bonitos en consola
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);


// Ruta Health Check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'API Online 🚀', time: new Date() });
});


// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});