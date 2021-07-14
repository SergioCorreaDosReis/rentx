import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import "dotenv/config";

interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	request: Request,
	Response: Response,
	next: NextFunction
) {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError("Token missing", 401);
	}

	// Bearer sdas5d4a5d4as5d4as55848484
	const [, token] = authHeader.split(" ");

	try {
		const { sub: user_id } = verify(
			token,
			"e31ba71e937cda0e9e12803e2ca7bcfe"
		) as IPayload;

		const usersRepository = new UsersRepository();
		const user = await usersRepository.finById(user_id);

		if (!user) {
			throw new AppError("User does not exist!", 401);
		}

		request.user = {
			id: user_id,
		};

		next();
	} catch {
		throw new AppError("Invalid token!", 401);
	}
}
