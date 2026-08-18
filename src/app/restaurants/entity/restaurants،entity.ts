import { ENUM_STATUS_RESTAURANTS } from "../enum/enum_restaurants";

export class Restaurants {
    id : number;
    ownerId:number;
    name : string ;
    logoURL :string ;
    status : ENUM_STATUS_RESTAURANTS;
    primaryCountry : string ;
    createdAt : Date ; 
    updatedAt : Date ;
    statusUpdatedAt : Date ;
    constructor(data : Partial<Restaurants>) {
        this.id = data.id! ;
        this.ownerId = data.ownerId!;
        this.name = data.name!;
        this.logoURL = data.logoURL!;
        this.status = data.status! ;
        this.primaryCountry = data.primaryCountry!;
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
        this.statusUpdatedAt = data.statusUpdatedAt ?? new Date();
    }
}