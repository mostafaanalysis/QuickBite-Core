import {IsString, MaxLength, MinLength,IsNotEmpty } 
from "class-validator";

export class edit_DTO{
    @IsString()
    @IsNotEmpty()
    newName!:string;
    @MinLength(10)
    @MaxLength(11)
    @IsNotEmpty()
    newPhone!:string;
}