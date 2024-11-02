import userRoutes from '../../../modules/User/Routes/UserRoutes';
import sessionRoutes from '../../../modules/User/Routes/SessionRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/login', sessionRoutes);
routes.use('/users', userRoutes);

export default routes;
