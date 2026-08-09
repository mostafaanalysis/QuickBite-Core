import { system_role_ent } from "../../user/enums";
import { findUserByEmail, findUserExitsByEmailOrPhone, updatePassword } from "../../user/repository/user.repo";
import { forgetPasswordDTO, loginDTO, register_DTO, resetPasswordDTO } from "../dto/auth.dto";
import { UserAlreadyExistsError } from "../error";
import { comparPassword, create_AccessToken, create_FreshToken, hashOTP,hashPassword, verfiyRefreshToken } from "../utils";
import { cannotSignUpAsAdmin } from "../error";
import { User } from "../../user/entity/user.entity";
import { createUser } from "../../user/repository/user.repo";
import { InccorectCredentials } from "../error";
import { generateOTP } from "../utils";
import { CreatePasswordReset, findLatestPsswordResetByUserId, updatePasswordResetConsumedAt } from "../repository/password-resets_repo";
import { InccorectOtp } from "../error";


export class authService {
    register = async (data : register_DTO)=>{
        if(data.role == system_role_ent.SYSTEM_ADMIN){
            throw  cannotSignUpAsAdmin
        }
    const existing : boolean = await findUserExitsByEmailOrPhone(data.email,data.phone);
    
    if(existing){
        throw  UserAlreadyExistsError 
        
    }
    const hashPasswordh  = await hashPassword(data.password);
    const now = new Date();
    const  user : User = await createUser({
        email : data.email,
        phone : data.phone,
        name : data.name,
        password_hash :hashPasswordh,
        system_role : data.role,
        created_at : now,
        updated_at : now,
    })
    const payload = {userId : user.id ,role :data.role,email:user.email};

    const accessToken = create_AccessToken(payload);

    const refreshToken = create_FreshToken(payload);

    return {
        message : "successfully registerd user",
        accessToken,
        refreshToken,
        user :{
            id : user.id,
            email: user.email,
            phone:user.phone,
        }
    }
    
}
login = async (data : loginDTO)=> {
    const user = await findUserByEmail(data.email);
    if(!user){
        throw InccorectCredentials;
    }
    const match  = await comparPassword(data.password,user.password_hash);
    if(! match){
        throw InccorectCredentials;
    }
    const payload = {userId : user.id ,role :user.system_role,email:user.email};

    const accessToken = create_AccessToken(payload);

    const refreshToken = create_FreshToken(payload);
    return {
        message : "login successfully",
        accessToken,
        refreshToken,
        user :{
            id : user.id,
            email: user.email,
            phone:user.phone,
        }
    }
    
}

forgetPassword = async (data : forgetPasswordDTO) => {
    const user = await findUserByEmail(data.email);
    if(!user){
    return
    }
    const otp =generateOTP();
    const hashedOTP= await hashOTP(otp);
    await CreatePasswordReset({
    userId: user.id,
    otpHash: hashedOTP,
    expires_At: new Date(Date.now() + 10 * 60 * 1000),
    created_At: new Date(),
});
console.log(`mockee email sent otp ${otp}`);
}
resetPassword = async (data:resetPasswordDTO)=>{
    const user = await findUserByEmail(data.email);
    if(!user){
        throw InccorectOtp
    }
    const reset = await findLatestPsswordResetByUserId(user.id);
    
    if(!reset){
        throw InccorectOtp
    }
    const inputOTPhash = await hashOTP(data.otp);

    if(inputOTPhash != reset.otpHash ||reset.isExpired()){
    throw InccorectOtp
    }
    const hashedPassword = await hashPassword(data.newPassword);
    await updatePassword(user.id,hashedPassword)
    await updatePasswordResetConsumedAt(reset.id)
}

refresh = async (refresh_token:string)=>{
    
    if(!refresh_token){
        throw InccorectCredentials;
    }

    const payload = verfiyRefreshToken(refresh_token);
    const accessToken = create_AccessToken({userId: payload.userId, role: payload.role, email: payload.email})
    return {accessToken};

}
}

export const authservice = new authService();


