import { Request, Response, NextFunction } from 'express';
import CustomerService from '../services/CustomerServices';
import { AppError } from '../../../shared/errors/AppError';

class CustomerController {
    static async createCustomer(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const customer = await CustomerService.createCustomer(req.body);
            return res.status(201).json(customer);
        } catch (error) {
            if (error instanceof Error) {
                return next(new AppError(error.message, 400)); // Ajuste o código conforme necessário
            } else {
                return next(new AppError('Um erro inesperado ocorreu', 500));
            }
        }
    }

    static async getCustomerById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const customer = await CustomerService.getCustomerById(
                req.params.id,
            );
            return res.status(200).json(customer);
        } catch (error) {
            if (error instanceof Error) {
                return next(new AppError(error.message, 404)); // Ajuste o código conforme necessário
            } else {
                return next(new AppError('Um erro inesperado ocorreu', 500));
            }
        }
    }

    static async getCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, limit, nome, cpf, email } = req.query;
            const query = {
                page: parseInt(page as string, 10) || 1,
                limit: parseInt(limit as string, 10) || 10,
                nome: (nome as string) || undefined,
                cpf: (cpf as string) || undefined,
                email: (email as string) || undefined,
            };
            const result = await CustomerService.getCustomers(query);
            return res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                return next(new AppError(error.message, 500));
            } else {
                return next(new AppError('Um erro inesperado ocorreu', 500));
            }
        }
    }

    static async updateCustomer(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const customer = await CustomerService.updateCustomer(
                req.params.id,
                req.body,
            );
            return res.status(200).json(customer);
        } catch (error) {
            if (error instanceof Error) {
                return next(new AppError(error.message, 400)); // Ajuste o código conforme necessário
            } else {
                return next(new AppError('Um erro inesperado ocorreu', 500));
            }
        }
    }

    static async deleteCustomer(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const customer = await CustomerService.deleteCustomer(
                req.params.id,
            );
            return res
                .status(200)
                .json({ message: 'Cliente excluído com sucesso', customer });
        } catch (error) {
            if (error instanceof Error) {
                return next(new AppError(error.message, 404)); // Ajuste o código conforme necessário
            } else {
                return next(new AppError('Um erro inesperado ocorreu', 500));
            }
        }
    }
}

export default CustomerController;
