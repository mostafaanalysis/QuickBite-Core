
import { IsEmail,MinLength,MaxLength,IsString,IsStrongPassword, ValidateNested, IsOptional,IsEnum} from "class-validator";
import { Type } from "class-transformer";
import { system_role_ent } from "../user/enums";
import { ENUM_STATUS_RESTAURANTS } from "./enum/enum_restaurants";
export class CreateRestaurantOwner_DTO {
    @IsEmail()
    email!: string;

    @MinLength(10)
    @MaxLength(11)
    phone!: string;

    @IsString()
    @MinLength(1)
    name!: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    }, {
        message: 'Password is too weak. It must be 8+ chars with mixed case, numbers, and symbols.'
    })
    password!: string;
    
        @IsEnum(system_role_ent)
        role! : system_role_ent;
}


export class CreateRestaurantDTO {
    @ValidateNested()
    @Type(() => CreateRestaurantOwner_DTO)
    owner!: CreateRestaurantOwner_DTO; 

    @IsString()
    @MinLength(1)
    name!: string;

    @IsString()
    @IsOptional()
    logoUrl?: string;

    @IsString()
    @MinLength(1)
    primaryCountry!: string;
}

export class UpdateRestaurant_DTO {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  primaryCountry?: string;
}

export class UpdateRestaurantStatus_DTO {
    @IsEnum(ENUM_STATUS_RESTAURANTS)
    status!: ENUM_STATUS_RESTAURANTS;
}