import { editUserNameAndPhone, findUserById } from "../repository/user.repo"
import { userNotFoundError } from "../errors/user.errors";
import { edit_DTO } from "../dto/userDTO";
import { findUserExitsPhone } from "../repository/user.repo";
import { UserAlreadyExistsError } from "../../auth/error";
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
}

export const userService = new UserService()