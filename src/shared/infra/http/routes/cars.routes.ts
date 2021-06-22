import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
	"/", // esta somente como "/" por que a referencia é feita no index.ts
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
