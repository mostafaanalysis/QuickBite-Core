import { IsEmail,IsString, IsStrongPassword, MaxLength, MinLength,IsEnum, isString, IsNotEmpty } from "class-validator";
import { system_role_ent } from "../../user/enums";
export class register_DTO{
    @IsEmail()
    email!:string;
    
    @MinLength(10)
    @MaxLength(11)
    phone!:string;

    @IsString()
    @MinLength(1)
    name!:string;
    
    @IsString()
    @IsStrongPassword({
    minLength: 8,           // Minimum length (default: 8)
    minLowercase: 1,         // Minimum lowercase characters (default: 1)
    minUppercase: 1,         // Minimum uppercase characters (default: 1)
    minNumbers: 1,           // Minimum number digits (default: 1)
}, {
    message: 'Password is too weak. It must be 8+ chars with mixed case, numbers, and symbols.'
})
    password!:string;

    @IsEnum(system_role_ent)
    role! : system_role_ent;

}

export class loginDTO{
    @IsEmail()
    email! :string ;

    @IsString()
    @IsNotEmpty()
    password!:string;


}