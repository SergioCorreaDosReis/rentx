import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoriesInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(
			carsRepositoryInMemory
		);
	});

	it("Should be able to list all available cars!", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car 1",
			description: "Car Descrition",
			daily_rate: 350,
			license_plate: "XPTO-9087",
			fine_amount: 150,
			brand: "Car_Brand",
			category_id: "e0a108aa-4b8d-4371-a847-b4443ffc78ae",
		});

		const cars = await listAvailableCarsUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it("Should be able to list all available cars by name", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car 2",
			description: "Car Descrition",
			daily_rate: 350,
			license_plate: "XPTO-9087",
			fine_amount: 150,
			brand: "Car_Brand_test",
			category_id: "e0a108aa-4b8d-4371-a847-b4443ffc78ae",
		});

		const cars = await listAvailableCarsUseCase.execute({ name: "Car 2" });

		expect(cars).toEqual([car]);
	});

	it("Should be able to list all available cars by brand", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car 2",
			description: "Car Descrition",
			daily_rate: 350,
			license_plate: "XPTO-9087",
			fine_amount: 150,
			brand: "Car_Brand_test",
			category_id: "e0a108aa-4b8d-4371-a847-b4443ffc78ae",
		});

		const cars = await listAvailableCarsUseCase.execute({
			brand: "Car_Brand_test",
		});

		expect(cars).toEqual([car]);
	});

	it("Should be able to list all available cars by category_id", async () => {
		const car = await carsRepositoryInMemory.create({
			name: "Car 2",
			description: "Car Descrition",
			daily_rate: 350,
			license_plate: "XPTO-9087",
			fine_amount: 150,
			brand: "Car_Brand_test",
			category_id: "e0a108aa-4b8d-4371-a847-b4443ffc78ae",
		});

		const cars = await listAvailableCarsUseCase.execute({
			category_id: "e0a108aa-4b8d-4371-a847-b4443ffc78ae",
		});

		expect(cars).toEqual([car]);
	});
});
