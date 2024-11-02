import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const newUserId = await createUser.execute({ name, email, password });

        return res.status(201).json({ id: newUserId });
    }

    public async remove(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteUser = new DeleteUserService();

        await deleteUser.execute(id);

        return res.status(204).json({});
    }
}
