import  config  from "./knexfile.js";
import knex from "knex";


export const db=knex(config);

export async function bingDB(){
    await db.raw('select 1')
}