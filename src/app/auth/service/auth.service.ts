import { system_role_ent } from "../../user/enums";
import { findUserByEmail, findUserExitsByEmailOrPhone } from "../../user/repository/user.repo";
import { loginDTO, register_DTO } from "../dto/auth.dto";
import { UserAlreadyExistsError } from "../error";
import { comparPassword, create_AccessToken, create_FreshToken, hashPassword } from "../utils";
import { cannotSignUpAsAdmin } from "../error";
import { User } from "../../user/entity/user.entity";
import { createUser } from "../../user/repository/user.repo";
import { InccorectCredentials } from "../error";

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

}   
export const authservice = new authService();
