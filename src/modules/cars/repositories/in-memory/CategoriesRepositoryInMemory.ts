import { Category } from "../../entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	categories: Category[] = [];

	async findByName(name: string): Promise<Category> {
		const category = await this.categories.find(
			(category) => category.name === name
		);

		return category;
	}

	async list(): Promise<Category[]> {
		const listAll = await this.categories;

		return listAll;
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = await new Category();

		Object.assign(category, { name, description });

		this.categories.push(category);
	}
}

export { CategoriesRepositoryInMemory };
