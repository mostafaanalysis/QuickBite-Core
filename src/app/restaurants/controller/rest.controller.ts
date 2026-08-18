import { NextFunction,Response,Request} from "express";
import { restaurantsService,RestaurantsService } from "../service/rest.service";

export class RestaurantController {
    constructor(private readonly restaurantsService : RestaurantsService){}
    getAll = async (req:Request, res:Response , next : NextFunction)=>{
    
        try {
        const result = await this.restaurantsService.findAll();

        res.status(200).json({
        data:result});
        }
        catch (err){
        next (err);
        }

    }
}

export const restaurantController = new RestaurantController(restaurantsService);