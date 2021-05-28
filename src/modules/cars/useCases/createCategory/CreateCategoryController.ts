import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUSeCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        await this.createCategoryUSeCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
