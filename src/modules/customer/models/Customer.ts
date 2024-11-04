import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/sequelize';

export class Customer extends Model {
    public id!: string; // Identificador único
    public nome!: string; // Nome do cliente
    public dataNascimento!: Date; // Data de nascimento
    public cpf!: string; // CPF do cliente (único)
    public email!: string; // Email (único)
    public telefone!: string; // Telefone do cliente
    public dataRegistro!: Date; // Data de cadastro
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt!: Date | null; // Data de exclusão, pode ser nula
}

Customer.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: { type: DataTypes.STRING, allowNull: false },
        dataNascimento: { type: DataTypes.DATE, allowNull: false },
        cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        telefone: { type: DataTypes.STRING, allowNull: false },
        dataRegistro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
    },
    {
        sequelize,
        tableName: 'customers',
        paranoid: true,
        timestamps: true,
    },
);

export default Customer;
