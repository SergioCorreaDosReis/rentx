import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificiationService } from "../modules/cars/services/CreateSpecificiationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const createSpecificiationService = new CreateSpecificiationService(
        specificationsRepository
    );

    createSpecificiationService.execute({ name, description });

    return response.status(201).send();
});

// specificationsRoutes.get("/", (request, response) => {
//     const listAllCategories = categoryRepository.list();
//     return response.status(201).json(listAllCategories);
// });

export { specificationsRoutes };
