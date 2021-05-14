import { Router } from "express";

import { CategoryRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    const listAllCategories = categoryRepository.list();
    return response.status(201).json(listAllCategories);
});

export { categoriesRoutes };
