import { validateBody } from "../../../common/validation/validate";
import { loginDTO, register_DTO } from "../dto/auth.dto";
import { authservice, authService } from "../service/auth.service";
import { NextFunction,Request,Response } from "express";

export class AuthController{
    constructor(private readonly authservice : authService){

    }
    register = async (req : Request, res: Response , next : NextFunction)=>{
        try{
    const data = await validateBody(register_DTO,req.body);
    const reslut = await this.authservice.register(data);
    res.status(201).json(reslut);
        } catch(err){
            next (err);
        }
    }
    login = async (req : Request, res: Response , next : NextFunction)=>{
        try{
            const data = await validateBody(loginDTO,req.body);
            const reslut = await this.authservice.login(data);
            res.status(200).json(reslut);
        }
        catch(err){
            next(err);
        }
    }
}

export const authcontroller= new AuthController(authservice);