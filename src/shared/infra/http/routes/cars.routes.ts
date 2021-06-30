import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
	"/", // esta somente como "/" por que a referencia é feita no index.ts
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
	"/specifications/:id",
	ensureAuthenticated,
	ensureAdmin,
	createCarSpecificationController.handle
);

carsRoutes.post(
	"/images/:id",
	ensureAuthenticated,
	ensureAdmin,
	upload.array("images"), // usar o mesmo nome que utilizou para variavel request.files as IFiles[]
	uploadCarsImageController.handle
);

export { carsRoutes };
