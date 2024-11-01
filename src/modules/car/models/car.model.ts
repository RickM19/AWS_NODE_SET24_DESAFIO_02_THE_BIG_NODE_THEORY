import sequelize from '../../../config/sequelize';
import { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Car extends Model {
    public id!: string;
    public plate!: string;
    public brand!: string;
    public model!: string;
    public km!: number;
    public year!: number;
    public items!: string[];
    public price!: number;
    public registrationDate!: Date;
    public status!: 'active' | 'inactive' | 'deleted';
    public createdAt!: Date;
    public updatedAt!: Date;
}

Car.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
        },
        plate: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        km: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: new Date().getFullYear() + 1 - 11,
            },
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                len: [0, 5],
                isUnique(value: string[]) {
                    if (new Set(value).size !== value.length) {
                        throw new Error('Items cannot contain duplicates');
                    }
                },
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
            },
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'deleted'),
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
