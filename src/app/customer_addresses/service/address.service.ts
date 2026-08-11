import { addresses_DTO } from "../DTO/dto";
import { addressNotCreated,addressNotUpdated , addressNotDeleted} from "../errors/address.error";
import { createAddress, DeleteAddress, getMyAdrress, UpdateAddress } from "../repository/address.repo";
import { Address } from "../entity/addresses.entity";

export class AddressService{
    createAddress = async (user_id : number,data:addresses_DTO) =>  {
    const row = await createAddress({
        user_id: user_id,
    label: data.label,
    country: data.country,
    city: data.city,
    street: data.street,
    building: data.building,
    apartment_number: data.apartment_number,
    type: data.type,
    lat: data.lat,
    lng: data.lng,
    is_default: data.is_default
    })
    if(!row){
        throw addressNotCreated;
    }
    return { address:
{
"id": row.id,
"user_id": row.user_id,
"label": row.label,
"country": row.country,
"city": row.city,
"street": row.street,
"building": row.building,
"apartmentNumber": row.apartment_number,
"type": row.type,
"lat": row.lat,
"lng": row.lng,
"isDefault": row.is_default}
}
    }
    getMyAddress = async (user_id:number) => {
        
        const rows = await getMyAdrress(user_id);
        return rows ;
    }
    updateAddress = async (id:number,user_id:number,data:Partial<Address>) => {
        const row = await UpdateAddress(id,user_id,data);
        if (!row){
            throw addressNotUpdated
        }
        return row ;
    }
    deleteAddress = async (id:number, user_id:number)=>{
    
        const count = await DeleteAddress(id,user_id);
        if(!count){
            throw addressNotDeleted
        }
        return count ;
    }
}

export const addressService = new AddressService();