import { Request, Response } from 'express';
import CarService from '../services/car.service';

class CarController {
    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const newCar = await CarService.createCar(req.body);
            return res.status(201).json(newCar);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'Unknown error occurred.' });
        }
    }

    static async getAll(_req: Request, res: Response): Promise<Response> {
        try {
            const cars = await CarService.getAllCars();
            return res.status(200).json(cars);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unknown error occurred.' });
        }
    }

    static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const car = await CarService.getCarById(req.params.id);
            return res.status(200).json(car);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(404).json({ message: 'Unknown error occurred.' });
        }
    }

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            const updatedCar = await CarService.updateCar(
                req.params.id,
                req.body,
            );
            return res.status(200).json(updatedCar);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(400).json({ message: 'Unknown error occurred.' });
        }
    }

    static async deleteCar(req: Request, res: Response): Promise<Response> {
        try {
            const result = await CarService.deleteCar(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
            return res.status(404).json({ message: 'Unknown error occurred.' });
        }
    }
}

export default CarController;
