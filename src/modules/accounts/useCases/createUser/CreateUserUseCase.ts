import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

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
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError("User already exists", 400);
		}

		const passwordHash = await hash(password, 8);

		await this.usersRepository.create({
			name,
			password: passwordHash,
			email,
			driver_license,
		});
	}
}

export { CreateUserUserCase };
