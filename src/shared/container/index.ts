import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

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
