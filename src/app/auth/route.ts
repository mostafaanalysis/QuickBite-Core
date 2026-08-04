import { Router } from "express";
import { authcontroller } from "./controller/auth.controller";

export const authRouter : Router = Router();

authRouter.post('/register',authcontroller.register);

authRouter.post('/login',authcontroller.login);