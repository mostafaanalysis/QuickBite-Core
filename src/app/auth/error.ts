import { AppError } from "../../common/error/AppError";

export const 
UserAlreadyExistsError= new AppError("user already exists with same phone or email",400)
export const  cannotSignUpAsAdmin = new AppError("you cannot register as admin",400)