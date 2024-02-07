import { OrderService } from "../service/orderService";
import { Request, Response } from "express";

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }
    public getOrder = async (req: Request, res: Response): Promise<void> => {
        const orderId = req.params.id;
        const order = await this.orderService.getOrderById(orderId);
        res.json({ message: 'Order found', data: order });
    };
    public getOrders = async (req: any, res: Response): Promise<void> => {
        const user_id = req.user.id;
        const orders = await this.orderService.getAllOrders(user_id);
        res.json({ message: 'Orders found', data: orders });
    };
    public addOrder = async (req: any, res: Response): Promise<void> => {
        console.log(req);
        try {
            const orderData = req.body;    
            orderData.user_id = req.user.id;
           
            const products = orderData.items;

            if (products.length === 0) {
                res.status(400).json({ message: 'Products are required' });
                return;
            }

            const newOrder = await this.orderService.addOrder(orderData);
            res.json({ message: 'Order added', data: newOrder });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    public updateOrder = async (req: Request, res: Response): Promise<void> => {
        const orderId = req.params.id;
        const orderData = req.body;
        const updatedOrder = await this.orderService.updateOrder(orderId, orderData);
        res.json({ message: 'Order updated', data: updatedOrder });
    }
    public deleteOrder = async (req: Request, res: Response): Promise<void> => {
        const orderId = req.params.id;
        const deletedOrder = await this.orderService.deleteOrder(orderId);
        res.json({ message: 'Order deleted', data: deletedOrder });
    }
}


