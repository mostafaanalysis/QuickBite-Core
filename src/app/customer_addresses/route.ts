import { Router } from "express";
import { addressController } from "./controller/address.controller";
import { authenticate } from "../../common/auth/guard";
export const addressRouter : Router = Router();


addressRouter.post('/addresses',authenticate,addressController.createAddress);

addressRouter.get('/addresses',authenticate,addressController.getMyAddress);

addressRouter.patch('/addresses/:id', authenticate, addressController.updateAddress);

addressRouter.delete('/addresses/:id',authenticate,addressController.deletAddress)