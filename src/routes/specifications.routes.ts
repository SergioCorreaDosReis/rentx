import { Router } from "express";

import { CreateSpecificiationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificiationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
