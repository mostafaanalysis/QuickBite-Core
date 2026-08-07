import { Request,Response,NextFunction } from "express";
import { notAuthenticated } from "../errors";
import { verfiyAccessToken } from "../../app/auth/utils";
export function authenticate(req : Request,res : Response,next:NextFunction){
    const token = req.cookies['access_token'];
    if(!token){
        throw notAuthenticated;
    }
    req.user = verfiyAccessToken(token);
    next();
}