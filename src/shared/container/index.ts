import { container } from "tsyringe";
import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

// ICategoryRepository
container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository", // Nome do nosso container
	CategoriesRepository // Nome da classe que queremos chamar
);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
	"SpecificationsRepository", // Nome do nosso container
	SpecificationsRepository // Nome da classe que queremos chamar
);

// IUsersRepository
container.registerSingleton<IUsersRepository>(
	"UsersRepository", // Nome do nosso container
	UsersRepository // Nome da classe que queremos chamar
);

// ICarsRepository
container.registerSingleton<ICarsRepository>(
	"CarsRepository", // Nome do nosso container
	CarsRepository // Nome da classe que queremos chamar
);

// ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
	"CarsImageRepository", // Nome do nosso container
	CarsImageRepository // Nome da classe que queremos chamar
);

// IRentalsRepository
container.registerSingleton<IRentalsRepository>(
	"RentalsRepository", // Nome do nosso container
	RentalsRepository // Nome da classe que queremos chamar
);
