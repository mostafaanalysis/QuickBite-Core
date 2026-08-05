import bcrypt from 'bcrypt';
import jwt,{ SignOptions } from 'jsonwebtoken';
import { env } from '../../common/config/env';
import crypto from "crypto";

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}

export function create_AccessToken(payload: JwtPayload): string {
    const options: SignOptions = {
    expiresIn: "1h"
    };

    return jwt.sign(payload, env.jwt.accessSecret, options);
}

export function create_FreshToken(payload: JwtPayload): string {
    const options: SignOptions = {
        expiresIn: "7d"
    };

    return jwt.sign(payload, env.jwt.refreshSecret, options);
}

export function comparPassword(inputPassword : string , hashedPassword : string){
    return bcrypt.compare(inputPassword,hashedPassword)
}

export function generateOTP () : string {
    return crypto.randomInt(100000,999000).toString()
}

export async function hashOTP(otp : string){
    
    return crypto.createHash("sha256").update(otp).digest("hex");
}