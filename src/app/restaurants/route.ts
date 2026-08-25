import { Router } from "express";
import { restaurantController } from "./controller/rest.controller";
import { authenticate } from "../../common/auth/guard";


export const restaurantRouter = Router();

restaurantRouter.get('/',restaurantController.getAll);

restaurantRouter.get('/:id',restaurantController.getRestaurantById);

restaurantRouter.post('/',authenticate,restaurantController.createRestaurantByAdmin);

restaurantRouter.patch('/:id',authenticate,restaurantController.updateRestaurant);

restaurantRouter.patch('/:id/status',authenticate,restaurantController.updateRestaurantStatus);
