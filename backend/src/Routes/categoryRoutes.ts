import { Router } from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../Controllers/categoryController';

const router = Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;