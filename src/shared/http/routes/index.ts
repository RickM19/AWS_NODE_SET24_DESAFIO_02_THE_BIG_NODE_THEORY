import userRoutes from '../../../modules/User/Routes/UserRoutes';
import sessionRoutes from '../../../modules/User/Routes/SessionRoutes';
import orderRoute from '../../../modules/Order/routes/createOrderRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/login', sessionRoutes);
routes.use('/users', userRoutes);

routes.use('/createOrder', orderRoute);

export default routes;
