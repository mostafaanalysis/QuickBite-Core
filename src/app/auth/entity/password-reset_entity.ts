import { date } from "zod";

export class PasswordResest{
    id : number; 
    userId: number;
    otpHash:string;
    expires_At:Date;
    consumed_At:Date;
    created_At:Date;

    constructor( id :number, 
    userId: number,
    otpHash:string,
    expires_At:Date,
    consumed_At:Date,
    created_At:Date){

    this.id = id;
    this.userId= userId;

    this.otpHash=otpHash;

    this.expires_At=expires_At;

    this.consumed_At=consumed_At;

    this.created_At=created_At;


    }
    isExpired():boolean{
        return this.expires_At < new Date();
    }
}