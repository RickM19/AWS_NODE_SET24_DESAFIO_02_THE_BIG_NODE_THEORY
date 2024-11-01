import sessionRoutes from '../../../modules/User/Routes/SessionRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/login', sessionRoutes);

export default routes;
