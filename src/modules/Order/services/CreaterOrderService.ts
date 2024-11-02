import { AppError } from '../../../shared/errors/AppError';
import Order from '../models/Order';
import car from '../../car/models/car.model';
import customer from '../../customer/models/Customer';
import axios from 'axios';

interface ExecuteParams {
    email: string;
    plate: string;
    CEP: string;
}

export default class CreaterOrderService {
    public async execute({ email, plate, CEP }: ExecuteParams) {
        try {
            //verificar se o cliente existe
            const customers = await customer.findOne({
                where: { email },
            });

            if (!customers) {
                throw new AppError('Cliente não encontrado', 404);
            }

            //verificar se o carro existe
            const searchCar = await car.findOne({
                where: { plate },
            });

            if (!searchCar) {
                throw new AppError('Carro não encontrado', 404);
            }

            //verificar se o cliente já possui pedido em aberto
            const searchOrder = await Order.findOne({
                where: { email, StatusPedido: 'Aberto' },
            });

            if (searchOrder) {
                throw new AppError('Cliente já possui pedido em aberto', 400);
            }

            let cidade = null;
            let uf = null;

            if (CEP) {
                const response = await axios.get(
                    `https://viacep.com.br/ws/${CEP}/json/`,
                );
                const data = response.data;

                if (data && !data.erro) {
                    cidade = data.localidade;
                    uf = data.uf;
                }
                throw new AppError('CEP inválido', 400);
            }

            //criar pedido
            const order = await Order.create({
                email,
                CarroPedido: car.id,
                CEP,
                cidade, // pegar da API externa
                uf, // pegar da API externa
                valorTotal: car.preco, // Usar o preço do carro encontrado
                dataInicial: null,
                dataFinal: null,
                dataCancelamento: null,
                status: 'Aberto',
            });

            return order;
        } catch (error) {
            throw new AppError('Erro ao criar pedido', 500);
        }
    }
}
