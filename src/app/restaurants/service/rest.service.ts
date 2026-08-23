import { RegisterRestaurantDTO } from "../../auth/dto/auth.dto";
import { createRestaurants, findAllRestaurant ,findRestaurantById, updateRestaurantStatus } from "../repo/restaurants.repo";
import { ENUM_STATUS_RESTAURANTS } from "../enum/enum_restaurants";
import { Restaurants } from "../entity/restaurants،entity";
import { Knex } from "knex";
import { RestaurantNotFoundError,RestaurantUpdateFailedError } from "../errors";
import { CreateRestaurantDTO } from "../restaurants.DTO";
import { userService } from "../../user/service/user.service";
import { db } from "../../../common/knex/knex";
import { system_role_ent } from "../../user/enums";
import { notAuthorized } from "../errors";
import { UpdateRestaurant_DTO } from "../restaurants.DTO";
import { updateRestaurants } from "../repo/restaurants.repo";
import { RestaurantDataRequiredError } from "../../auth/error";
import { AppError } from "../../../common/error/AppError";
import { UpdateRestaurantStatus_DTO } from "../restaurants.DTO";

export class RestaurantsService{
    createRestaurants = async function (userId:number,data:RegisterRestaurantDTO,trx:Knex) {
        
        const now = new Date();
        const Restaurant = await createRestaurants(new Restaurants({
            ownerId:userId,
            name :data.name,
            logoURL : data.logoURL,
            primaryCountry : data.primaryCountry,
            status : ENUM_STATUS_RESTAURANTS.PENDING,
            createdAt:now,
            updatedAt:now,
            statusUpdatedAt :now
            
        }),trx)
        return Restaurant;
    }
    findAll = async function () {
        const result = findAllRestaurant();
        return result;
    }
    getRestaurantById = async function (id:number) {
        const row = await findRestaurantById(id);
        if (!row) {
    throw RestaurantNotFoundError;
}
        return row;
    }


    createRestaurantByAdmin = async function (data: CreateRestaurantDTO,currentUser: any) {

    if (currentUser.role !== system_role_ent.SYSTEM_ADMIN) {
        throw notAuthorized;
    }

    const trx = await db.transaction();

    try {

        const user =
            await userService.createUserRestaurant(
                data.owner,
                trx
            );

        const now = new Date();

        const Restaurant =
            await createRestaurants(
                new Restaurants({
                    ownerId: user.id,
                    name: data.name,
                    logoURL: data.logoUrl,
                    primaryCountry: data.primaryCountry,
                    status: ENUM_STATUS_RESTAURANTS.PENDING,
                    createdAt: now,
                    updatedAt: now,
                    statusUpdatedAt: now
                }),
                trx
            );

        await trx.commit();

        return {
            user,
            Restaurant
        };

    } catch (err) {

        await trx.rollback();

        throw err;
    }
}
updateRestaurant = async function (data: UpdateRestaurant_DTO,userId: number,role: string,restaurantId: number) {
const restaurant = await findRestaurantById(restaurantId);

if (!restaurant) {
    throw RestaurantNotFoundError;
}


const isOwner = Number(restaurant.ownerId) === Number(userId);
const isAdmin = role === "system_admin";

if (!isOwner && !isAdmin) {
    throw notAuthorized;
}

const updatedRestaurant = await updateRestaurants(
    data,
    restaurantId
);

if (!updatedRestaurant) {
    throw RestaurantUpdateFailedError;
}

return updatedRestaurant;
};

updateRestaurantStatus = async function (status:UpdateRestaurantStatus_DTO,role:string,id:number){
    const isAdmin = role === "system_admin";
    if (!isAdmin) {
    throw notAuthorized;
}
const row = await updateRestaurantStatus(status,id);
if(!row){
    throw new AppError("Not updated",404);
}
return row;
}

}
export const restaurantsService = new RestaurantsService();