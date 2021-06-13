import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Criar Categorias", () => {
	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepositoryInMemory
		);
	});
	it("Should be able to create a new Category", async () => {
		const category = {
			name: "Category Test",
			description: "Category description Teste",
		};

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description,
		});

		const categoryCreated = await categoriesRepositoryInMemory.findByName(
			category.name
		);

		expect(categoryCreated).toHaveProperty("id");
	});

	it("Should not be able to create a new Category when category already exists", async () => {
		expect(async () => {
			const category = {
				name: "Category Test",
				description: "Category description Teste",
			};

			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description,
			});

			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description,
			});
		}).rejects.toBeInstanceOf(AppError); // Espero que se ele for rejeitado seja uma instancia do meu AppError
	});
});
