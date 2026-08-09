import { NextFunction,Request,Response } from "express";
import { userService,UserService } from "../service/user.service";
import { validateBody } from "../../../common/validation/validate";
import { edit_DTO } from "../dto/userDTO";

export class UserController {
    constructor (private readonly userService : UserService){}
    
getMe= async(req:Request,res:Response,next:NextFunction) =>{
    
    try { 
    const user = await this.userService.getByUserId(req.user?.userId!);
    res.status(200).json(user);

    }
    catch(err){
        next(err)
    }


        }

        editMe = async (req:Request, res:Response , next :NextFunction) => {

            try{
                const data =await validateBody(edit_DTO,req.body);
            const user = await this.userService.editMe(req.user?.userId!,data);
            res.status(200).json({"message" :"updated",user})
            }
            catch(err){
            next(err)
            }
        }
    
}

export const userController = new UserController(userService);