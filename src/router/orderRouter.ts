import { OrderController } from "../controller/orderController";
import express from 'express';
import { protect } from "../middleware/protect";
import checkAmount from "../middleware/checkAmount";

const orderController = new OrderController();

const router = express.Router();

router.get('/',protect, orderController.getOrders);
router.post('/add',protect,checkAmount, orderController.addOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);

export default router;