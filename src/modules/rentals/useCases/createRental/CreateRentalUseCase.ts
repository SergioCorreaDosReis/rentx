import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
	constructor(
		@inject("RentalsRepository")
		private rentalsRepository: IRentalsRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("CarsRepository")
		private carsRepository: ICarsRepository
	) {}

	async execute({
		user_id,
		car_id,
		expected_return_date,
	}: IRequest): Promise<Rental> {
		const minimumHours = 24;

		// Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo carro
		const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(
			car_id
		);

		if (carUnAvailable) {
			throw new AppError("Car is unavailable", 400);
		}
		// Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo usuário
		const rentalOpenToUser =
			await this.rentalsRepository.findOpenRentalByUserId(user_id);

		if (rentalOpenToUser) {
			throw new AppError(
				"There is already exists rental in progress for this user",
				400
			);
		}
		// O aluguel deve ter duração mínima de 24 horas.
		const dateNow = this.dateProvider.dateNow();

		const compare = this.dateProvider.compareInHours(
			dateNow,
			expected_return_date
		);

		if (compare < minimumHours) {
			throw new AppError(
				"Invalid return time! The rental time must have a minimum of 24 hours.",
				400
			);
		}
		// Salva aluguel/rental
		const rental = await this.rentalsRepository.create({
			user_id,
			car_id,
			expected_return_date,
		});

		// Atualiza o disponibilidade do carro como falso depois de aluga-lo
		await this.carsRepository.updateAvailable(car_id, false);

		return rental;

		// Ao realizar um aluguel, o status do carro deverá ser - alterado para indisponível
	}
}

export { CreateRentalUseCase };
