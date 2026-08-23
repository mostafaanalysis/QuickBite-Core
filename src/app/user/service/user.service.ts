import { createUser, editUserNameAndPhone, findUserById } from "../repository/user.repo"
import { userNotFoundError } from "../errors/user.errors";
import { edit_DTO } from "../dto/userDTO";
import { findUserExitsPhone } from "../repository/user.repo";
import { UserAlreadyExistsError } from "../../auth/error";
import { register_DTO } from "../../auth/dto/auth.dto";
import { Knex } from "knex";
import { CreateRestaurantOwner_DTO } from "../../restaurants/restaurants.DTO";
import { findUserExitsByEmailOrPhone } from "../repository/user.repo";
import { hashPassword } from "../../auth/utils";
import { system_role_ent } from "../enums";
export class UserService {

    getByUserId = async (userId:number) => {
        const user = await findUserById(userId);
        if(!user){
            throw userNotFoundError ; 
        }
        return {
            id : user.id,
            email : user.email,
            name : user.name,
            phone:user.phone,
            systemRole:user.system_role,
        }
    }
    editMe = async (id:number,data:edit_DTO) =>{
    const existing : boolean = await findUserExitsPhone(data.newPhone);
        
        if(existing){
            throw  UserAlreadyExistsError 
            
        }
    const user = await editUserNameAndPhone(id,data.newName,data.newPhone);
    return user;
    }




createUserRestaurant = async (data:register_DTO,conn:Knex) => {

const existing : boolean = await findUserExitsByEmailOrPhone(data.email,data.phone);

if(existing){
throw  UserAlreadyExistsError 
}
const hashPasswordh  = await hashPassword(data.password);

    const userRestaurant = await createUser({
    email : data.email,
        phone : data.phone,
        name : data.name,
        password_hash :hashPasswordh,
        system_role : system_role_ent.RESTAURANT_USER,
        created_at : new Date(),
        updated_at : new Date(),
    },conn);
    
    if(!userRestaurant){
        throw userNotFoundError
    }
    return userRestaurant
    }
}

export const userService = new UserService()