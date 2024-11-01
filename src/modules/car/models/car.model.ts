import sequelize from '../../../config/sequelize';
import { DataTypes, Model } from 'sequelize';

class Car extends Model {
    public id!: number;
    public brand!: string;
    public model!: string;
    public year!: number;
    public color!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Car.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        paranoid: true,
        tableName: 'cars',
    },
);

export default Car;
