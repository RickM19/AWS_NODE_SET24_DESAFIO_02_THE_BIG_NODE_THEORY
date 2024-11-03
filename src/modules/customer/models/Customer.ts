import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/sequelize';

export class Customer extends Model {
    declare id: string; // Identificador único
    declare nome: string; // Nome do cliente
    declare dataNascimento: Date; // Data de nascimento
    declare cpf: string; // CPF do cliente (único)
    declare email: string; // Email (único)
    declare telefone: string; // Telefone do cliente
    declare dataCadastro: Date; // Data de cadastro
    declare dataExclusao: Date | null; // Data de exclusão, pode ser nula
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
        timestamps: true,
        paranoid: true,
    },
);

export default Customer;
