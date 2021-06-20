import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
	"/", // esta somente como "/" por que a referencia é feita no index.ts
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle
);

export { carsRoutes };
