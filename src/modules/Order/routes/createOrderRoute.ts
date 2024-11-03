// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Router } from "express";
import CreaterOrderController from "../controller/CreaterOrder";
import ReadOrderController from "../controller/ReadOrder";
import DeleteOrderController from '../controller/DeleteOrder';

const orderRoute = Router();

    const createrOrderController = new CreaterOrderController();
    const readOrderController = new ReadOrderController();
    const deleteOrderController = new DeleteOrderController();

    orderRoute.post('/create', createrOrderController.createOrder);
    orderRoute.get('/:id', readOrderController.readOrder);
    orderRoute.delete('/:id', deleteOrderController.delete);

export default orderRoute;
