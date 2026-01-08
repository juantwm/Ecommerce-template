import { Router } from 'express';
import { createOrder, getOrders } from '../Controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/', getOrders);

export default router;