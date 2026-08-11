
import { type_addresses_enum } from "../enum/addresses.enums";

type addresses_prop = {
    id: number;
    user_id : number ;
    label : string ; 
    country : string;
    city : string;
    street :string;
    building :string;
    apartment_number : string;
    type :type_addresses_enum;
    lat :number;
    lng :number;
    is_default:boolean;
}

export class Address {
    id: number;
    user_id: number;
    label: string;
    country: string;
    city: string;
    street: string;
    building: string;
    apartment_number: string;
    type: type_addresses_enum;
    lat: number;
    lng: number;
    is_default: boolean;

    constructor(user: addresses_prop) {
        this.id = user.id;
        this.user_id = user.user_id;
        this.label = user.label;
        this.country = user.country;
        this.city = user.city;
        this.street = user.street;
        this.building = user.building;
        this.apartment_number = user.apartment_number;
        this.type = user.type;
        this.lat = user.lat;
        this.lng = user.lng;
        this.is_default = user.is_default;
    }
}