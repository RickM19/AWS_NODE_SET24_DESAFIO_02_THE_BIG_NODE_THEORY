<<<<<<< HEAD
import customerRoutes from '../../../modules/customer/routes/CustomerRoutes';
=======
import userRoutes from '../../../modules/User/Routes/UserRoutes';
>>>>>>> develop
import sessionRoutes from '../../../modules/User/Routes/SessionRoutes';
import orderRoute from '../../../modules/Order/routes/createOrderRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/login', sessionRoutes);
<<<<<<< HEAD
routes.use('/api', customerRoutes);
=======
routes.use('/users', userRoutes);

routes.use('/Order', orderRoute);
>>>>>>> develop

export default routes;
