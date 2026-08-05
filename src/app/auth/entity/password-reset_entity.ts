
export class PasswordResest{
    id : number; 
    userId: number;
    otpHash:string;
    expires_At:Date;
    consumed_At:Date | null;
    created_At:Date;

    constructor(data : Partial <PasswordResest>){

    this.id = data.id!;

    this.userId= data.userId!;

    this.otpHash=data.otpHash!;

    this.expires_At=data.expires_At!;

    this.consumed_At=data.consumed_At!;
    
    this.created_At= data.created_At!;
    }
    isExpired():boolean{
        return this.expires_At < new Date();
    }
}