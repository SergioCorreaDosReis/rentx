import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUserCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email, driver_license } = request.body;

        const createUserUserCase = container.resolve(CreateUserUserCase);

        await createUserUserCase.execute({
            name,
            password,
            email,
            driver_license,
        });

        return response.status(201).send();
    }
}

export { CreateUserController };
