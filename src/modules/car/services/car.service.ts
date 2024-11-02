import Car from '../models/car.model';
import { v4 as uuidv4 } from 'uuid';

// Definindo uma interface para os dados do carro
interface CarData {
    plate: string;
    brand: string;
    model: string;
    km: number;
    year: number;
    items: string[];
    price: number;
    status: 'active' | 'inactive' | 'deleted';
}

class CarService {
    static async createCar(data: CarData) {
        const { plate, brand, model, km, year, items, price, status } = data;

        if (
            !plate ||
            !brand ||
            !model ||
            !year ||
            !items ||
            !price ||
            !status
        ) {
            throw new Error('All required fields must be filled.');
        }
        if (items.length > 5 || new Set(items).size !== items.length) {
            throw new Error('Items must be unique and cannot exceed five.');
        }
        if (year < new Date().getFullYear() + 1 - 11) {
            throw new Error(
                'The year of the car must be within the last 11 years.',
            );
        }

        const existingCar = await Car.findOne({
            where: { plate, status: ['active', 'inactive'] },
        });

        if (existingCar) {
            throw new Error('A car with this plate already exists.');
        }

        const newCar = await Car.create({
            id: uuidv4(),
            plate,
            brand,
            model,
            km,
            year,
            items,
            price,
            registrationDate: new Date(),
            status,
        });

        return newCar;
    }

    static async getAllCars() {
        return await Car.findAll();
    }

    static async getCarById(id: string) {
        const car = await Car.findByPk(id);
        if (!car) throw new Error('Car not found');
        return car;
    }

    static async updateCar(id: string, data: CarData) {
        const { plate, brand, model, km, year, items, price, status } = data;

        if (
            !plate ||
            !brand ||
            !model ||
            !year ||
            !items ||
            !price ||
            !status
        ) {
            throw new Error('All required fields must be filled.');
        }
        if (items.length > 5 || new Set(items).size !== items.length) {
            throw new Error('Items must be unique and cannot exceed five.');
        }
        if (year < new Date().getFullYear() + 1 - 11) {
            throw new Error(
                'The year of the car must be within the last 11 years.',
            );
        }

        const car = await Car.findByPk(id);
        if (!car) throw new Error('Car not found');

        await car.update({
            plate,
            brand,
            model,
            km,
            year,
            items,
            price,
            status,
        });

        return car;
    }

    static async deleteCar(id: string) {
        const car = await Car.findByPk(id);
        if (!car) throw new Error('Car not found');

        await car.destroy();
        return { message: 'Car deleted successfully' };
    }
}

export default CarService;
