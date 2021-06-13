import { Router } from "express";

import { AuthenticateUserUseController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseController";

const authenticateRoutes = Router();

const authenticateUserUseController = new AuthenticateUserUseController();

authenticateRoutes.post("/sessions", authenticateUserUseController.handle);

export { authenticateRoutes };
