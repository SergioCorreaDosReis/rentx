import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

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
