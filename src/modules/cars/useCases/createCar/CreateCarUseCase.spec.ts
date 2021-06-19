import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it("Shoud be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "Name Car",
			description: "Descrition Car",
			daily_rate: 150,
			license_plate: "JBR1010",
			fine_amount: 60,
			brand: "Brand Car",
			category_id: "Category_ID",
		});
		expect(car).toHaveProperty("id");
	});

	it("Should no be able to create a car if already exists license_plate", () => {
		expect(async () => {
			await createCarUseCase.execute({
				name: "Car1",
				description: "Descrition Car",
				daily_rate: 150,
				license_plate: "JBR1010",
				fine_amount: 60,
				brand: "Brand Car",
				category_id: "Category_ID",
			});
			await expect(
				createCarUseCase.execute({
					name: "Car2",
					description: "Descrition Car",
					daily_rate: 150,
					license_plate: "JBR1010",
					fine_amount: 60,
					brand: "Brand Car",
					category_id: "Category_ID",
				})
			).rejects.toBeInstanceOf(AppError);
		});
	});

	it("Shoud be able to create a car with available true by default", async () => {
		const car = await createCarUseCase.execute({
			name: "Car Available",
			description: "Descrition Car",
			daily_rate: 150,
			license_plate: "XPTO1516",
			fine_amount: 60,
			brand: "Brand Car",
			category_id: "Category_ID",
		});

		expect(car.available).toBe(true);
	});
});
