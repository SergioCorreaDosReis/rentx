import { ICreateCarsDto } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
	create(data: ICreateCarsDto): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
	findAllAvailable(
		brand?: string,
		category_id?: string,
		name?: string
	): Promise<Car[]>;
	findById(id: string): Promise<Car>;
	updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
