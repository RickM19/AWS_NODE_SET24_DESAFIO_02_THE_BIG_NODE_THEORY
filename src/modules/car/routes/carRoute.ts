// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Router } from 'express';
import CarController from '../controllers/carController';

const carRoute = Router();

carRoute.post('/create', CarController.create);
carRoute.get('/', CarController.getAll);
carRoute.get('/:id', CarController.getById);
carRoute.put('/:id', CarController.update);
carRoute.delete('/:id', CarController.deleteCar);

export default carRoute;
