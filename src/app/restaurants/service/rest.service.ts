import { RegisterRestaurantDTO } from "../../auth/dto/auth.dto";
import { createRestaurants, findAllRestaurant } from "../repo/restaurants.repo";
import { ENUM_STATUS_RESTAURANTS } from "../enum/enum_restaurants";
import { Restaurants } from "../entity/restaurants،entity";
import { Knex } from "knex";

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
}
export const restaurantsService = new RestaurantsService();