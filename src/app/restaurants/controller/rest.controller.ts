import { NextFunction,Response,Request} from "express";
import { restaurantsService,RestaurantsService } from "../service/rest.service";
import { validateBody } from "../../../common/validation/validate";
import { CreateRestaurantDTO, UpdateRestaurant_DTO } from "../restaurants.DTO";
import { UpdateRestaurantStatus_DTO } from "../restaurants.DTO";
import { RestaurantDataRequiredError } from "../../auth/error";

export class RestaurantController {
    constructor(private readonly restaurantsService : RestaurantsService){}
    getAll = async (req:Request, res:Response , next : NextFunction)=>{
    
        try {
        const result = await this.restaurantsService.findAll();

        res.status(200).json({data:result});
        }
        catch (err){
        next (err);
        }

    }
    getRestaurantById = async (req:Request, res:Response , next : NextFunction)=>{
    
        try {
        const result = await this.restaurantsService.getRestaurantById(Number(req.params.id));
        res.status(200).json({data:result});

        }
        catch(err){
        next(err);
        }

    }

createRestaurantByAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await validateBody(
            CreateRestaurantDTO,
            req.body
        );

        const result =
            await this.restaurantsService.createRestaurantByAdmin(
                data,
                req.user!
            );

        res.status(201).json({
            message: "Restaurant created successfully",

            restaurant: {
                id: result.Restaurant.id,
                ownerId: result.Restaurant.ownerId,
                name: result.Restaurant.name,
                logoURL: result.Restaurant.logoURL,
                primaryCountry: result.Restaurant.primaryCountry,
                status: result.Restaurant.status,
                createdAt: result.Restaurant.createdAt,
            },

            owner: {
                id: result.user.id,
                email: result.user.email,
                phone: result.user.phone,
                name: result.user.name,
                systemRole: result.user.system_role,
            }
        });
    }
    catch (err) {
        next(err);
    }
}
updateRestaurant = async (req: Request,res: Response,next: NextFunction) => {
try {
    const data = await validateBody(UpdateRestaurant_DTO,req.body);

    if (!data) {
    throw RestaurantDataRequiredError;
    }

    const restaurantId = Number(req.params.id);
    const userId = Number(req.user?.userId);
    const role = req.user!.role;

    const row = await this.restaurantsService.updateRestaurant(
    data,
    userId,
    role,
    restaurantId
);

    res.status(200).json({
    message: "Restaurant updated successfully",
    restaurant: row,
    });
} catch (err) {
    next(err);
}
};
updateRestaurantStatus = async (req: Request,res: Response,next: NextFunction) =>{
    try{
    const role = req.user!.role;
    const restaurantId = Number(req.params.id);
    const status = await validateBody(UpdateRestaurantStatus_DTO,req.body);
    const row = await this.restaurantsService.updateRestaurantStatus(status,role,restaurantId);
    res.status(200).json({status:row.status});
    } 
    catch(err){
        next(err)
    }
}
}


export const restaurantController = new RestaurantController(restaurantsService);