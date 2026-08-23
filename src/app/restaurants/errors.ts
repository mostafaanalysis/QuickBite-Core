import {AppError} from "../../common/error/AppError";

export const RestaurantNotFoundError = new AppError('Restaurant Not found',404);
export const notAuthorized = new AppError('User Not Authorized',401);

export const RestaurantUpdateFailedError = new AppError("failed to update restaurant", 500);

export const RestaurantDataRequiredError = new AppError("restaurants data is required", 400);

export const BranchNotFoundError = new AppError("branch not found", 404);

export const BranchUpdateFailedError = new AppError("failed to update branch", 500);