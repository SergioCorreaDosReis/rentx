import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}
@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const categories: IImportCategory[] = [];
			const parseFile = csvParse(); // csvParse() -  responsavel por ler linha por linha do arquivo
			stream.pipe(parseFile); // "pipe" Responsavel por pegar o pedaço lido e repassar para dentro do parseFile
			// "on"  recebe a linha que esta lendo e aplica uma ação no caso print no console
			parseFile
				.on("data", async (line) => {
					const [name, description] = line;
					categories.push({ name, description });
				})
				.on("end", () => {
					fs.promises.unlink(file.path); // faz a remoção de um arquivo
					resolve(categories);
				})
				.on("error", (err) => {
					reject(err);
				});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const { name, description } = category;
			const categoryAllreadyExists = await this.categoriesRepository.findByName(
				name
			);

			if (!categoryAllreadyExists) {
				await this.categoriesRepository.create({ name, description });
			}
		});
	}
}

export { ImportCategoryUseCase };
