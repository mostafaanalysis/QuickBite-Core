import { UnAuthorisedError } from "../../../common/auth/errors";
import { BranchNotFoundError, BranchUpdateFailedError, notAuthorized, RestaurantNotFoundError } from "../../restaurants/errors";
import { findRestaurantById } from "../../restaurants/repo/restaurants.repo";
import { restaurantsService } from "../../restaurants/service/rest.service";
import {system_role_ent} from "../../user/enums";
import {CreateBranchDTO, UpdateBranchDTO, UpdateBranchStatusDTO} from "../dto/branch.dto";
import {findNearbyBranches, createBranch, branchesOfRestaurant, getBranchById, updateBranch, updateBranchStatus} from "../repository/branch.repository";

export class BranchService {

    findNearby = async (lat:number, lng:number) => {
        const rows = await findNearbyBranches(lat, lng);
        return rows;
    }

    create = async (restaurantId: number, userId: number, userRole: system_role_ent, data: CreateBranchDTO) => {
        const restaurant = await findRestaurantById(restaurantId);
        if (!restaurant) {
    throw RestaurantNotFoundError;
}
        if(userRole !== system_role_ent.SYSTEM_ADMIN && (Number(restaurant.ownerId) !== Number(userId)) ){
            throw UnAuthorisedError
        }

        const now = new Date();
        const branch = await createBranch({
            restaurantId: restaurantId,
            label: data.label,
            countryCode: data.countryCode,
            lat: data.lat,
            lng: data.lng,
            addressText: data.addressText,
            isActive: false,
            opensAt: data.opensAt,
            closesAt: data.closesAt,
            currency: data.currency,
            deliveryRadius: data.deliveryRadius,
            commission: 0,
            createdAt: now,
            updatedAt: now,
            acceptOrders: true,
        });

        return branch;
    }
    branchesOfRestaurant = async (restaurantId:number)=>{
    const row = await branchesOfRestaurant(restaurantId);
    return row;
    }
    updateBranch = async (data:UpdateBranchDTO,userId:number,branchId:number,role:string)=>{
        const dataOfBranch = await getBranchById(branchId);
if (!dataOfBranch) {
    throw BranchNotFoundError;
}

    const dataOfRestaurant = await restaurantsService.getRestaurantById(dataOfBranch.restaurantId);

    if(Number(dataOfRestaurant.ownerId) !== Number(userId) && role !==system_role_ent.SYSTEM_ADMIN){
        throw notAuthorized
    }
    const result = await updateBranch(branchId,data);
if (!result) {
    throw BranchUpdateFailedError;
}
return result;
    }
    updateBranchStatus = async (branchId: number,userRole: string,data: UpdateBranchStatusDTO) => {

    if (userRole !== system_role_ent.SYSTEM_ADMIN) {
        throw UnAuthorisedError;
    }

    const branch = await updateBranchStatus(branchId, data);

    if (!branch) {
        throw BranchNotFoundError;
    }

    return branch;
};
}

export const branchService = new BranchService();