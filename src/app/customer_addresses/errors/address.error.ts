import { AppError } from "../../../common/error/AppError";
export const addressNotCreated = new AppError("Address could not be created",500);

export const addressNotFound = new AppError("Address not found",500);

export const addressNotUpdated = new AppError("Address not updated",500);

export const addressNotDeleted = new AppError("Address not deleted",500);