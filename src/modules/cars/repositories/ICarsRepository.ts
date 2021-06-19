import { ICreateCarsDto } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
	create(data: ICreateCarsDto): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
}

export { ICarsRepository };