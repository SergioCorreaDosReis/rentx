import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/cars/infra/typeorm//entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

// Singleton - Cria Apenas uma instancia de uma class e ela é Global
class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	constructor() {
		this.repository = getRepository(Category);
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			name,
			description,
		});

		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const categories = await this.repository.find();
		return categories;
	}

	async findByName(name: string): Promise<Category> {
		// select * from categories where name = "name" limit 1
		const category = await this.repository.findOne({ name });
		return category;
	}
}

export { CategoriesRepository };
