import { AppError } from "../../../common/error/AppError";

export const userNotFoundError = new AppError('user not found',404)