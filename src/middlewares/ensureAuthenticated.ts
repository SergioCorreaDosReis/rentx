import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
        throw new Error("Token missing");
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
            throw new Error("User does not exist!");
        }

        next();
    } catch {
        throw new Error("Invalid token!");
    }
}
