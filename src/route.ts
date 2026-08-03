import { Router } from "express";
import { authRouter } from "./app/auth/route.js";
export const router=Router();

import { route_health } from "./app/health/routes_health.js";

router.use('/health',route_health);

router.use('/auth',authRouter);