import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUserCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUserCase: CreateUserUserCase;

describe("Authenticate User", () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory
		);
		createUserUserCase = new CreateUserUserCase(usersRepositoryInMemory);
	});

	it("Should be able to authenticate an user", async () => {
		const user: ICreateUsersDTO = {
			name: "User_Test",
			password: "123456",
			email: "user@teste.com",
			driver_license: "987654",
		};

		await createUserUserCase.execute(user);

		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(result).toHaveProperty("token");
	});

	it("Should not be able authenticate a nonexistent user", async () => {
		await expect(
			authenticateUserUseCase.execute({
				email: "jovem@teste.com",
				password: "456789",
			})
		).rejects.toEqual(new AppError("Email or password incorrect"));
	});

	it("Should not be able authenticate a user with a incorrect password", async () => {
		const user: ICreateUsersDTO = {
			name: "User_Pass",
			password: "1234",
			email: "user_pass@teste.com",
			driver_license: "897452",
		};

		await createUserUserCase.execute(user);

		await expect(
			authenticateUserUseCase.execute({
				email: user.email,
				password: "3214",
			})
		).rejects.toEqual(new AppError("Email or password incorrect"));
	});
});
