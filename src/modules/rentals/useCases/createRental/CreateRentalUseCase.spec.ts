import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
	const dayAdd24Hours = dayjs().add(1, "day").toDate();

	beforeEach(() => {
		rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		dayjsDateProvider = new DayjsDateProvider();
		createRentalUseCase = new CreateRentalUseCase(
			rentalsRepositoryInMemory,
			dayjsDateProvider,
			carsRepositoryInMemory
		);
	});

	it("Should be able to create a new rental", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Test",
			description: "Car Test",
			daily_rate: 100,
			license_plate: "Test",
			fine_amount: 50,
			brand: "Test Brand",
			category_id: "12345",
		});
		const rental = await createRentalUseCase.execute({
			user_id: "12345",
			car_id: car.id,
			expected_return_date: dayAdd24Hours,
		});

		expect(rental).toHaveProperty("id");
		expect(rental).toHaveProperty("start_date");
	});

	it("Should not be able to create a new rental if there is another open rental open to the same user", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Test",
			description: "Car Test",
			daily_rate: 100,
			license_plate: "Test",
			fine_amount: 50,
			brand: "Test Brand",
			category_id: "12345",
		});

		await createRentalUseCase.execute({
			user_id: "12345",
			car_id: car.id,
			expected_return_date: dayAdd24Hours,
		});

		await expect(
			createRentalUseCase.execute({
				user_id: "12345",
				car_id: car.id,
				expected_return_date: dayAdd24Hours,
			})
		).rejects.toEqual(new AppError("Car is unavailable"));
	});

	it("Should not be able to create a new rental if there is another open rental open to the same car", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Test",
			description: "Car Test",
			daily_rate: 100,
			license_plate: "Test",
			fine_amount: 50,
			brand: "Test Brand",
			category_id: "12345",
		});
		await createRentalUseCase.execute({
			user_id: "1111",
			car_id: car.id,
			expected_return_date: dayAdd24Hours,
		});

		await expect(
			createRentalUseCase.execute({
				user_id: "3216",
				car_id: car.id,
				expected_return_date: dayAdd24Hours,
			})
		).rejects.toEqual(new AppError("Car is unavailable"));
	});

	it("Should not be able to create a new rental with less then 24 hours of return time", async () => {
		await expect(
			createRentalUseCase.execute({
				user_id: "1234",
				car_id: "test2",
				expected_return_date: dayjs().toDate(),
			})
		).rejects.toEqual(
			new AppError(
				"Invalid return time! The rental time must have a minimum of 24 hours."
			)
		);
	});
});
