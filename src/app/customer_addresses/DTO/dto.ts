import { IsString,IsEnum, IsNotEmpty,IsNumber, IsBoolean , IsOptional  }from "class-validator";
import { type_addresses_enum } from "../enum/addresses.enums";
export  class addresses_DTO {
    
    @IsString()
    @IsNotEmpty()
    label! :string;

    @IsNotEmpty()
    @IsString()
    country! : string ;
    
    @IsNotEmpty()
    @IsString()
    city! : string ; 
    

    @IsNotEmpty()
    @IsString()
    street! : string;
    
    @IsNotEmpty()
    @IsString()
    building! : string;
    
    @IsNotEmpty()
    @IsString()
    apartment_number!:string;
    

    @IsEnum(type_addresses_enum)
    type!:type_addresses_enum;


    @IsNotEmpty()
    @IsNumber()
    lat!:number;


    @IsNotEmpty()
    @IsNumber()
    lng!:number;

    @IsBoolean()
    is_default! : boolean;

}


export class UpdateAddressDTO {
    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    street?: string;

    @IsOptional()
    @IsString()
    building?: string;

    @IsOptional()
    @IsString()
    apartment_number?: string;

    @IsOptional()
    @IsEnum(type_addresses_enum)
    type?: type_addresses_enum;

    @IsOptional()
    @IsNumber()
    lat?: number;

    @IsOptional()
    @IsNumber()
    lng?: number;

    @IsOptional()
    @IsBoolean()
    is_default?: boolean;
}