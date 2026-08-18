import { Restaurants } from "../entity/restaurants،entity"
import { db } from "../../../common/knex/knex";
import { Knex } from "knex";

const RESTAURANTS_COLUMNS = [
    'id', 'owner_id', 'name', 'logo_url', 'status',
    'primary_country', 'created_at', 'updated_at', 'status_updated_at'
]
    
function toEntity(row: any) {
    return new Restaurants({
        id: row.id,
        ownerId: row.owner_id,
        name: row.name,
        logoURL: row.logo_url,
        status: row.status,
        primaryCountry: row.primary_country,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        statusUpdatedAt: row.status_updated_at
    });
}

export async function findAllRestaurants() {
    const rows = await db("restaurants").select(RESTAURANTS_COLUMNS);
    return rows.map(toEntity);
}

// find rest by id 

export async function createRestaurants(data: Partial<Restaurants>,conn:Knex = db): Promise<Restaurants> {
    const [row] = await conn("restaurants").insert({
        owner_id: data.ownerId,
        name: data.name,
        logo_url: data.logoURL,
        status: data.status,
        primary_country: data.primaryCountry,
        created_at: data.createdAt ?? new Date(),
        updated_at: data.updatedAt ?? new Date(),
        status_updated_at: data.statusUpdatedAt ?? new Date()
    }).returning(RESTAURANTS_COLUMNS);

    return toEntity(row);
}

export async function findAllRestaurant(){
    const rows = await db("restaurants").select(RESTAURANTS_COLUMNS);
    return rows.map(toEntity);
}

export async function findRestaurantById(id: number) {
    const row = await db("restaurants").select(RESTAURANTS_COLUMNS).where("id", id).first();
    return toEntity(row);
}