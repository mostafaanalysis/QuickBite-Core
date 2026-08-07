import { Router } from "express";
import { authRouter } from "./app/auth/route.js";
export const router=Router();

import { route_health } from "./app/health/routes_health.js";
import { userRouter } from "./app/user/route.js";

router.use('/health',route_health);

router.use('/auth',authRouter);

router.use('/user',userRouter)