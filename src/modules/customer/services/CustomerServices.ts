import Customer from '../models/Customer';
import { AppError } from '../../../shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

interface ICustomerData {
    nome: string;
    dataNascimento: Date;
    cpf: string;
    email: string;
    telefone: string;
}

interface IFilter {
    nome?: string;
    cpf?: string;
    email?: string;
}

interface IPaginate {
    page: number;
    limit: number;
}

interface IResponse {
    customers: Customer[];
    pages: number;
}

interface IWhereFilter {
    nome?: {
        [Op.like]: string;
    };
    cpf?: {
        [Op.like]: string;
    };
    email?: {
        [Op.like]: string;
    };
}

class CustomerService {
    public async createCustomer(data: ICustomerData): Promise<Customer> {
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

    public async getCustomerById(id: string): Promise<Customer> {
        const customer = await Customer.findOne({
            where: { id, dataExclusao: null },
        });

        if (!customer) {
            throw new AppError('Cliente não encontrado');
        }

        return customer;
    }

    public async getCustomers(query: IPaginate & IFilter): Promise<IResponse> {
        const { page = 1, limit = 10, ...filters } = query;

        const whereFilter: IWhereFilter = {};
        if (filters.nome) {
            whereFilter.nome = { [Op.like]: `%${filters.nome}%` };
        }
        if (filters.cpf) {
            whereFilter.cpf = { [Op.like]: `%${filters.cpf}%` };
        }
        if (filters.email) {
            whereFilter.email = { [Op.like]: `%${filters.email}%` };
        }

        const countCustomers = await Customer.count({
            where: {
                dataExclusao: null,
                ...whereFilter,
            },
        });

        const pages = Math.ceil(countCustomers / limit);
        const customers = await Customer.findAll({
            where: {
                dataExclusao: null,
                ...whereFilter,
            },
            limit,
            offset: (page - 1) * limit,
        });

        if (countCustomers === 0) {
            throw new AppError('Nenhum cliente encontrado', 404);
        }

        return {
            customers,
            pages,
        };
    }

    public async updateCustomer(
        id: string,
        data: Partial<ICustomerData>,
    ): Promise<Customer> {
        const customer = await Customer.findOne({
            where: { id, dataExclusao: null },
        });

        if (!customer) {
            throw new AppError('Cliente não encontrado');
        }

        await customer.update(data);
        return customer;
    }

    public async deleteCustomer(id: string): Promise<Customer> {
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
