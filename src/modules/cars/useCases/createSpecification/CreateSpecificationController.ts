import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificiationUseCase";

class CreateSpecificiationController {
    constructor(
        private createSpecificiationUseCase: CreateSpecificationUseCase
    ) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createSpecificiationUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificiationController };
