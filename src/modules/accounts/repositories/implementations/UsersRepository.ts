import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUsersDTO): Promise<void> {
        const user = await this.repository.create({
            name,
            password,
            email,
            driver_license,
        });
        await this.repository.save(user);
    }
}

export { UsersRepository };