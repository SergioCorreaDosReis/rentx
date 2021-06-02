import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUserCase {
    constructor(
        @inject("UsersRepository") // passa o nome colocado no container no index.ts
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUsersDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            password,
            email,
            driver_license,
        });
    }
}
export { CreateUserUserCase };
