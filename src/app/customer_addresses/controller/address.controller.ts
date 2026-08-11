import { NextFunction, Request, Response } from "express";
import { AddressService,addressService } from "../service/address.service";
import { validateBody } from "../../../common/validation/validate";
import { addresses_DTO,UpdateAddressDTO } from "../DTO/dto";

export class AddressController {
    constructor(private readonly addressService : AddressService){}
    createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await validateBody(addresses_DTO, req.body);
        const result = await this.addressService.createAddress(req.user!.userId, data);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}
getMyAddress = async (req: Request, res: Response, next: NextFunction)  =>{
    try {
        const result = await this.addressService.getMyAddress(req.user!.userId)
        res.status(200).json(result);
    }
    catch(err){
        next (err)
    }
}
updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addressId = Number(req.params.id);
        const data = await validateBody(UpdateAddressDTO, req.body);
        const result = await this.addressService.updateAddress(addressId, req.user!.userId, data);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}
deletAddress = async (req : Request , res:Response , next :NextFunction) =>{
    try {
        const addressId = Number(req.params.id);
        const count = await this.addressService.deleteAddress(addressId,req.user!.userId);
        res.status(200).json({
            "message":"deleted successfully",
            "count":count
        })
    }
    catch(err){
        next(err);
    }
}
}


export const addressController = new AddressController(addressService);