import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificiationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificiationUseCase";

const specificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
    specificationsRepository
);

const createSpecificationController = new CreateSpecificiationController(
    createSpecificationUseCase
);

export { createSpecificationController };
