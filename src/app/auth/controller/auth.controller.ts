import { validateBody } from "../../../common/validation/validate";
import { forgetPasswordDTO, loginDTO, register_DTO, resetPasswordDTO } from "../dto/auth.dto";
import { authservice, AuthService } from "../service/auth.service";
import { NextFunction,Request,Response } from "express";
import { optionsAccess,optionsRefresh } from "../../../common/auth/cookie-option";
import { youAreUnthoraized } from "../error";

export class AuthController{
    constructor(private readonly authservice : AuthService){

    }
    register = async (req : Request, res: Response , next : NextFunction)=>{
        try{
    const data = await validateBody(register_DTO,req.body);
    const reslut = await this.authservice.register(data);
    res.cookie("access_token", reslut.accessToken, optionsAccess)
res.cookie("refresh_token", reslut.refreshToken, optionsRefresh);
    res.status(201).json(reslut);
        } catch(err){
            next (err);
        }
    }
    login = async (req : Request, res: Response , next : NextFunction)=>{
        try{
            const data = await validateBody(loginDTO,req.body);
            const reslut = await this.authservice.login(data);
            res.cookie("access_token", reslut.accessToken, optionsAccess)
res.cookie("refresh_token", reslut.refreshToken, optionsRefresh);
            res.status(200).json(reslut);
        }
        catch(err){
            next(err);
        }
    }
    
    forgetpassword = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const data= await validateBody(forgetPasswordDTO,req.body);
    await this.authservice.forgetPassword(data);
    res.status(200).json({
        "message" : "email sent with OTP"
    })
    }
    catch(err){
    next(err);
    }
    }


    resetpassword = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const data= await validateBody(resetPasswordDTO,req.body);
    await this.authservice.resetPassword(data);
    res.status(200).json({
        "message" : "Password resets succesfully , please login again"
    })
    }
    catch(err){
    next(err);
    }
    }
    refresh = async (req:Request,res:Response ,next:NextFunction)=>{
        try {
            if(!req.cookies.refresh_token){
            throw youAreUnthoraized
        }
        const result = await this.authservice.refresh(req.cookies.refresh_token)
        res.cookie("access_token",result.accessToken,optionsAccess)
        res.status(200).json({"message": "success"})
        }
        catch(err){
            next(err)
        }
    }
}

export const authcontroller= new AuthController(authservice);