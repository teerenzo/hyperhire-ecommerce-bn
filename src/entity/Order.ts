import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Adjust the import path as necessary
import { User } from './User';

class Order extends Model{
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public totalAmount!: number;
    public orderDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
    book_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
 
    amount: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },

    order_date: {
        type: new DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "orders",
    sequelize,
});

class OrderBook extends Model{
    public id!: number;
    public orderId!: number;
    public bookId!: number;
    public quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrderBook.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: "id",
        },
    },
    book_id: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "books",
            key: "id",
        },
    },
    quantity: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "OrderBooks",
    sequelize,
});

Order.hasMany(OrderBook, {
    sourceKey: 'id',
    foreignKey: 'order_id',
    as: 'orderBooks',
});

Order.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  
    });



export { Order, OrderBook };
