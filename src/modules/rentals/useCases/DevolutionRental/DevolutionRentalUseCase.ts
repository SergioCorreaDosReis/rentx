import { inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	id: string;
	user_id: string;
}

class DevolutionRentalUseCase {
	constructor(
		@inject("RentalsRepository")
		private rentalsRepository: IRentalsRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("CarsRespository")
		private carsRespository: ICarsRepository
	) {}

	async execute({ id, user_id }: IRequest): Promise<Rental> {
		const rental = await this.rentalsRepository.findById(id);
		const car = await this.carsRespository.findById(id);
		const minimumDaily = 1;

		if (rental) {
			throw new AppError("Rental doesn't exist", 400);
		}

		// Verificar o tempo decorrido do Aluguel
		const dateNow = this.dateProvider.dateNow();

		// verifica quantas diarias tem
		let daily = this.dateProvider.compareInDays(
			rental.start_date,
			this.dateProvider.dateNow()
		);

		// Se diaria for menor que 0, ou seja menor que 1 dia ele estabelece o minimo de 1 diaria
		if (daily <= 0) {
			daily = minimumDaily;
		}

		// Verifica a quantidade de dias em atraso
		const delay = this.dateProvider.compareInDays(
			dateNow,
			rental.expected_return_date
		);

		let total = 0;
		// se o traso for maior que zero ele calcula a multa de atraso de carros
		if (delay > 0) {
			const calculate_fine = delay * car.fine_amount;
			total = calculate_fine;
		}

		// agrega ao valor total o valor + dias X valor dia
		total += daily * car.daily_rate;

		rental.end_date = this.dateProvider.dateNow();
		rental.total = total;

		await this.rentalsRepository.create(rental);

		await this.carsRespository.updateAvailable(car.id, true);

		return rental;
	}
}

export { DevolutionRentalUseCase };
