import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
	private repository: Repository<Rental>;

	constructor() {
		this.repository = getRepository(Rental);
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		// where permite consultar duas condições
		const openByCar = await this.repository.findOne({
			where: { car_id, end_date: null },
		});
		return openByCar;
	}

	async findOpenRentalByUserId(user_id: string): Promise<Rental> {
		// where permite consultar duas condições
		const openByUser = await this.repository.findOne({
			where: { user_id, end_date: null },
		});
		return openByUser;
	}

	async create({
		user_id,
		car_id,
		expected_return_date,
		id,
		end_date,
		total,
	}: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create({
			user_id,
			car_id,
			expected_return_date,
			id,
			end_date,
			total,
		});

		await this.repository.save(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		const rental = await this.repository.findOne(id);
		return rental;
	}

	async findByUser(user_id: string): Promise<Rental[]> {
		const rentals = await this.repository.find({
			where: { user_id },
			/* o relation retorna a informação da relação que esta dentro [""] da entidade Rental
				o nome da relação é "car"
				@ManyToOne(() => Car)
				@JoinColumn({ name: "car_id" })
				car: Car;
			*/
			relations: ["car"],
		});
		return rentals;
	}
}

export { RentalsRepository };
