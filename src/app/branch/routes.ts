import {Router} from "express";
import {authenticate} from "../../common/auth/guard";
import {branchController} from "./controller/branch.controller";

export const branchRouter = Router();

branchRouter.get('/branches/nearby', branchController.findNearby);

branchRouter.post('/restaurants/:restaurantId/branches',authenticate,branchController.create);

branchRouter.get('/restaurants/:restaurantId/branches',branchController.branchesOfRestaurant);

branchRouter.post('/restaurants/branches/:id',authenticate,branchController.updateBranch);

branchRouter.patch("/branches/:id/status",authenticate,branchController.updateBranchStatus);
