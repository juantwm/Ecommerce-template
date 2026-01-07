import { Router } from 'express';
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../Controllers/productController';

const router = Router();

// Rutas base: /api/products
router.get('/', getProducts);       // Obtener todos (y filtrar)
router.get('/:id', getProductById); // Obtener uno por ID
router.post('/', createProduct);    // Crear
router.put('/:id', updateProduct);  // Actualizar
router.delete('/:id', deleteProduct); // Borrar

export default router;