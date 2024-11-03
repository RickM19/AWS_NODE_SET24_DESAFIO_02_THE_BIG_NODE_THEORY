import Customer from '../models/Customer';
import { AppError } from '../../../shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

class CustomerService {
    static async createCustomer(data: any) {
        // Validação de dados
        const { nome, dataNascimento, cpf, email, telefone } = data;

        if (!nome || !dataNascimento || !cpf || !email || !telefone) {
            throw new AppError('Todos os campos são obrigatórios');
        }

        // Verifica se o cliente já existe
        const existingCustomer = await Customer.findOne({
            where: {
                [Op.or]: [{ cpf }, { email }],
                dataExclusao: null, // Considera apenas clientes ativos
            },
        });

        if (existingCustomer) {
            throw new AppError('Cliente com CPF ou email já cadastrado');
        }

        // Criação do cliente
        const customer = await Customer.create({
            id: uuidv4(), // Gerar um UUID para o id
            ...data,
            dataCadastro: new Date(),
        });

        return customer;
    }

    static async getCustomerById(id: string) {
        const customer = await Customer.findOne({
            where: { id, dataExclusao: null },
        });

        if (!customer) {
            throw new AppError('Cliente não encontrado');
        }

        return customer;
    }

    static async getCustomers(query: any) {
        // Implemente a lógica de filtragem, ordenação e paginação aqui
        const { page = 1, limit = 10, ...filters } = query;

        const customers = await Customer.findAll({
            where: {
                dataExclusao: null,
                ...filters,
            },
            limit,
            offset: (page - 1) * limit,
        });

        return {
            data: customers,
            page,
            limit,
        };
    }

    static async updateCustomer(id: string, data: any) {
        const customer = await Customer.findOne({
            where: { id, dataExclusao: null },
        });

        if (!customer) {
            throw new AppError('Cliente não encontrado');
        }

        await customer.update(data);
        return customer;
    }

    static async deleteCustomer(id: string) {
        const customer = await Customer.findOne({
            where: { id, dataExclusao: null },
        });

        if (!customer) {
            throw new AppError('Cliente não encontrado');
        }

        await customer.update({ dataExclusao: new Date() });
        return customer;
    }
}

export default CustomerService;
