import { db } from "../../../common/knex/knex";
import { Address } from "../entity/addresses.entity";

const ADDRESS_COLUMNS = [
    "id",
    "user_id",
    "label",
    "country",
    "city",
    "street",
    "building",
    "apartment_number",
    "type",
    "lat",
    "lng",
    "is_default",
];

function toEntity(row: Partial<Address>): Address {
    return new Address({
        id: row.id!,
        user_id: row.user_id!,
        label: row.label!,
        country: row.country!,
        city: row.city!,
        street: row.street!,
        building: row.building!,
        apartment_number: row.apartment_number!,
        type: row.type!,
        lat: row.lat!,
        lng: row.lng!,
        is_default: row.is_default!,
    });
}

export async function createAddress(address :Partial <Address>) : Promise <Address> {
    
    const [row] = await db("customer_addresses").insert({
    user_id: address.user_id,
    label: address.label,
    country: address.country,
    city: address.city,
    street: address.street,
    building: address.building,
    apartment_number: address.apartment_number,
    type: address.type,
    lat: address.lat,
    lng: address.lng,
    is_default: address.is_default
}).returning(ADDRESS_COLUMNS);
return toEntity(row);
}

export async function getMyAdrress(user_id:number) {
    
    const rows = await db("customer_addresses").select(ADDRESS_COLUMNS)
    .where("user_id",user_id);
    return rows.map(toEntity);
}

export async function UpdateAddress(id: number, user_id: number, data: Partial<Address>): Promise<Address | undefined> {
    const [row] = await db("customer_addresses")
        .update(data)
        .where("id",id)
        .andWhere("user_id", user_id)
        .returning(ADDRESS_COLUMNS);
    return row ? toEntity(row) : undefined;
}

export async function DeleteAddress(id: number, user_id: number): Promise<number> {
    const deletedCount = await db("customer_addresses")
        .where("id", id)
        .andWhere("user_id", user_id)
        .delete();
    return deletedCount;
}