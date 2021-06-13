import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { User } from "../entities/User";

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
		id,
		avatar,
	}: ICreateUsersDTO): Promise<void> {
		const user = await this.repository.create({
			name,
			password,
			email,
			driver_license,
			id,
			avatar,
		});
		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.repository.findOne({ email });

		return user;
	}

	async finById(id: string): Promise<User> {
		const user = await this.repository.findOne(id);

		return user;
	}
}

export { UsersRepository };
