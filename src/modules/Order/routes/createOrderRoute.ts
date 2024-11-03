import { Router } from "express";
import CreaterOrderController from "../controller/CreaterOrder";


const orderRoute = Router();
const createrOrderController = new CreaterOrderController();

orderRoute.post('/', createrOrderController.createOrder);

export default orderRoute;
