import { AppError } from "./error/AppError";

export const notAuthenticated = new AppError("User not found",403)