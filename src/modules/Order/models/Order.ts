import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/sequelize';
import { car } from "../../car/models/car.model";
import { customer } from "../../customer/models/Customer"

class Order extends Model {
    declare id: number;
    declare cliente: number;
    declare DataInicial: Date;
    declare status: string;
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
            type: DataTypes.UUID,
            allowNull: false,
             references: {
                model: customer, // nome do model cliente
                key: 'id'
            }
        },
        DataInicial: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            validate: {
                isDate: true, // validação para garantir que seja válida
            },
        },
        status: {
            type: DataTypes.ENUM('Aberto', 'Aprovado', 'Cancelado'),
            allowNull: false,
            defaultValue: 'Aberto',
        },
        CEP: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                is: /^\d{5}-?d{3}$/, //validação para o formato
            },
        },
        Cidade: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        UF: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        ValorTotal: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        CarroPedido: {
            type: DataTypes.UUID,
            allowNull: false,
             references: {
                model: car, // nome do model cliente
                key: 'id'
            }
        },
        DataFinal: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
            validate: {
                isDate: true, // validação para garantir que seja válida
            },
        },
        DataCancelamento: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            validate: {
                isDate: true, // validação para garantir que seja válida
            },
        },
    },

    {
        sequelize,
        paranoid: true,
        timestamps: true,
        tableName: 'orders'
    },
);

export default Order;
