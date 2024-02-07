
import { User } from "../entity/User";
import {Order,OrderBook} from "../entity/Order";


export class OrderRepository {
    public getAll = async (user_id:number): Promise<any> => {
        return Order.findAll({
            where: {
                user_id,
            },
            include: [
                {
                    model: OrderBook,
                    as: 'orderBooks',
                    attributes: ['id', 'quantity'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email'],
                    
                }
            ],
            attributes: ['id', 'order_date', 'status', 'amount'],
          
        });
    };
    public findOrderById = async (id: string): Promise<any> => {
        return Order.findByPk(id);
    };
    public addOrder = async (orderData: any): Promise<any> => {
        return Order.create(orderData);
    };
    public updateOrder = async (id: string, orderData: any): Promise<any> => {
        return Order.update(orderData, {
            where: {
                id,
            },
        });
    }
    public deleteOrder = async (id: string): Promise<any> => {
        return Order.destroy({
            where: {
                id,
            },
        });
    }
    public getOrders = async (page: number, limit: number): Promise<any> => {
        return Order.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
        });
    }
    public addOrderBook = async (orderBookData: any): Promise<any> => {
        return OrderBook.create(orderBookData);
    }
}