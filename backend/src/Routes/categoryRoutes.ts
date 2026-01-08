import { Router } from 'express';
import { getAllCategories, createCategory, deleteCategory, updateCategory } from '../Controllers/categoryController';

const router = Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

export default router;