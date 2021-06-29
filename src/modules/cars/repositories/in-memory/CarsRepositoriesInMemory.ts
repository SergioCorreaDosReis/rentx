import { ICreateCarsDto } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];
	async create({
		name,
		description,
		daily_rate,
		license_plate,
		fine_amount,
		brand,
		category_id,
		id,
	}: ICreateCarsDto): Promise<Car> {
		const car = new Car();

		Object.assign(car, {
			name,
			description,
			daily_rate,
			license_plate,
			fine_amount,
			brand,
			category_id,
			id,
		});
		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return this.cars.find((car) => car.license_plate === license_plate);
	}

	async findAllAvailable(
		brand?: string,
		category_id?: string,
		name?: string
	): Promise<Car[]> {
		// filter retorna lista de objetos/array
		const allCars = await this.cars.filter((car) => {
			if (
				car.available === true ||
				(brand && car.brand === brand) ||
				(category_id && car.category_id === category_id) ||
				(name && car.name === name)
			) {
				return car;
			}
			return null;
		});

		return allCars;
	}

	async findById(id: string): Promise<Car> {
		return this.cars.find((car) => car.id === id);
	}
}

export { CarsRepositoryInMemory };
