import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { AppError } from '../../../shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await User.findOne({ where: { email }, raw: true });
        if (!user) {
            throw new AppError(
                'Combinação de email e senha incorretas. Por favor, tente novamente!',
                401,
            );
        }

        const passwordMatchs = await compare(password, user.password);

        if (!passwordMatchs) {
            throw new AppError(
                'Combinação de email e senha incorretas. Por favor, tente novamente!',
                401,
            );
        }
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });
        return {
            user,
            token,
        };
    }
}
