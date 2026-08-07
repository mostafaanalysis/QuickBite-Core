import { findUserById } from "../repository/user.repo"
import { userNotFoundError } from "../errors/user.errors";
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
}

export const userService = new UserService()