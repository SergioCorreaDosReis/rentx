import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationRepositoryInMemory
		);
	});

	it("Should not be able to add a new specification to a noun existent car!", async () => {
		await expect(async () => {
			const car_id = "123";
			const specifications_id = ["69874"];

			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("Should be able to add a new specification to the car!", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Name Car",
			description: "Descrition Car",
			daily_rate: 150,
			license_plate: "JBR1010",
			fine_amount: 60,
			brand: "Brand Car",
			category_id: "Category_ID",
		});

		const specification = await specificationRepositoryInMemory.create({
			name: "Test",
			description: "Test",
		});

		const specifications_id = [specification.id];

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id,
		});

		expect(specificationsCars).toHaveProperty("specifications:");
		expect(specificationsCars.specifications.length).toBe(1);
	});
});
