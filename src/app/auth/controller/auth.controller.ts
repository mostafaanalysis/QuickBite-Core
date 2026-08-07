import { validateBody } from "../../../common/validation/validate";
import { forgetPasswordDTO, loginDTO, register_DTO, resetPasswordDTO } from "../dto/auth.dto";
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
            res.cookie("access_token", reslut.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60*60*1000
})
res.cookie("refresh_token", reslut.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path : '/api/auth/refresh'
    });
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
}

export const authcontroller= new AuthController(authservice);