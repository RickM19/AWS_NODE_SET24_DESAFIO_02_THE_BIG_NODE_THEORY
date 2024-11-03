import { Router } from "express";
import CreaterOrderController from "../controller/CreaterOrder";
import ReadOrderController from "../controller/ReadOrder";

const orderRoute = Router();

    const createrOrderController = new CreaterOrderController();
    const readOrderController = new ReadOrderController();

    orderRoute.post('/create', createrOrderController.createOrder);
    orderRoute.get('/:id', readOrderController.readOrder);

export default orderRoute;
