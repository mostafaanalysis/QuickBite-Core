import {IsString, IsNotEmpty, IsNumber, IsInt, Min, IsEnum, IsOptional,IsBoolean} from "class-validator";
import { Currency } from "../enum";

export class CreateBranchDTO {
    @IsString()
    @IsNotEmpty()
    countryCode!: string;

    @IsString()
    @IsNotEmpty()
    label!: string;

    @IsString()
    @IsNotEmpty()
    addressText!: string;

    @IsNumber()
    lat!: number;

    @IsNumber()
    lng!: number;

    @IsString()
    opensAt!: string;

    @IsString()
    closesAt!: string;

    @IsInt()
    @Min(0)
    deliveryRadius!: number;

    @IsEnum(Currency)
    currency!: Currency
}

export class UpdateBranchDTO {

    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    addressText?: string;

    @IsOptional()
    @IsNumber()
    lat?: number;

    @IsOptional()
    @IsNumber()
    lng?: number;

    @IsOptional()
    @IsString()
    opensAt?: string;

    @IsOptional()
    @IsString()
    closesAt?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    deliveryRadius?: number;

    @IsOptional()
    @IsString()
    currency?: string;

    @IsOptional()
    @IsBoolean()
    acceptOrders?: boolean;
}