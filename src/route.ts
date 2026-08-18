import { Router } from "express";
import { restaurantRouter } from "./app/restaurants/route.js";
import { authRouter } from "./app/auth/route.js";
import { addressRouter } from "./app/customer_addresses/route.js";
import { branchRouter } from "./app/branch/routes.js";
export const router=Router();

import { route_health } from "./app/health/routes_health.js";
import { userRouter } from "./app/user/route.js";

router.use('/health',route_health);

router.use('/auth',authRouter);

router.use('/user',userRouter);

router.use('/customer',addressRouter);

router.use('/restaurants',restaurantRouter);
router.use('/',branchRouter)