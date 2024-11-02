import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/sequelize';

export class Customer extends Model {
    public id!: string; // Identificador único
    public nome!: string; // Nome do cliente
    public dataNascimento!: Date; // Data de nascimento
    public cpf!: string; // CPF do cliente (único)
    public email!: string; // Email (único)
    public telefone!: string; // Telefone do cliente
    public dataCadastro!: Date; // Data de cadastro
    public dataExclusao!: Date | null; // Data de exclusão, pode ser nula
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
        dataCadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        dataExclusao: { type: DataTypes.DATE, allowNull: true },
    },
    {
        sequelize,
        tableName: 'customers',
    },
);

export default Customer;
