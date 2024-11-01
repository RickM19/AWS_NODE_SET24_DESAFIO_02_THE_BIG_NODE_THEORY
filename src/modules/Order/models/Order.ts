import { DataTypes, Model } from 'sequelize';
import sequelize from '@config/sequelize';

class Order extends Model {
    declare id: number;
    declare cliente: number;
    declare DataInicial: Date;
    declare StatusPedido: string;
    declare CEP: string;
    declare Cidade: string;
    declare UF: string;
    declare ValorTotal: number;
    declare CarroPedido: number;
    declare DataFinal: Date;
    declare DataCancelamento: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
           /* references: {
                model: Customer, // nome do model cliente
                key: 'id'
            }*/
        },
        DataInicial: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true, // validação para garantir que seja válida
            },
        },
        StatusPedido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CEP: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^\d{5}-?d{3}$/, //validação para o formato
            },
        },
        Cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UF: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ValorTotal: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        CarroPedido: {
            type: DataTypes.NUMBER,
            allowNull: false,
            /* references: {
                model: Car, // nome do model cliente
                key: 'id'
            }*/
        },
        DataFinal: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true, // validação para garantir que seja válida
            },
        },
        DataCancelamento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDate: true, // validação para garantir que seja válida
            },
        },
    },
    { sequelize, paranoid: true, timestamps: true, tableName: 'orders' }
);

export default Order;
