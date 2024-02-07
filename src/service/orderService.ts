import { User } from "../entity/User";
import { OrderRepository } from "../repository/orderRepository";

export class OrderService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }
    public getAllOrders = async (user_id:number): Promise<any> => {
        return this.orderRepository.getAll(user_id);
    };
    public getOrderById = async (id: string): Promise<any> => {
        return this.orderRepository.findOrderById(id);
    };
    public addOrder = async (orderData: any): Promise<any> => {
        const products = orderData.items;
        products.forEach((product: any) => {
            if (!product.id) {
                throw new Error('Product id is required');
            }
            if (!product.quantity) {
                throw new Error('Product quantity is required');
            }
        }
        );
        const newOrder = await this.orderRepository.addOrder({
            order_date: new Date(),
            status: 'pending',
            user_id: orderData.user_id,
            book_id: products[0].id,
            amount: orderData.amount,

        });
      await this.updatePoints(orderData.user_id, orderData.amount);
        const orderId = newOrder.id;
        products.forEach(async (product: any) => {
            const orderBookData = {
                order_id: orderId,
                book_id: product.id,
                quantity: product.quantity,
            };
            await this.orderRepository.addOrderBook(orderBookData);
        });
        return newOrder;
    };
    public updateOrder = async (id: string, orderData: any): Promise<any> => {
        return this.orderRepository.updateOrder(id, orderData);
    }
    public deleteOrder = async (id: string): Promise<any> => {
        return this.orderRepository.deleteOrder(id);
    }

    // pagination
    public getOrders = async (page: number, limit: number): Promise<any> => {
        return this.orderRepository.getOrders(page, limit);
    }
    public updatePoints = async (id: string, points: number): Promise<any> => {
        const user:any = await User.findByPk(id);
        return await User.update({ points: 100 }, { where: { id } });
      }
}