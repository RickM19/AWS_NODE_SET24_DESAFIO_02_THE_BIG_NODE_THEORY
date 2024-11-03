import customerRoutes from '../../../modules/customer/routes/CustomerRoutes';
import sessionRoutes from '../../../modules/User/Routes/SessionRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/login', sessionRoutes);
routes.use('/api', customerRoutes);

export default routes;
