
import { db } from "../../../common/knex/knex";
import { User } from "../entity/user.entity";
import { UserResponse } from "../entity/user.entity";

const USER_COLUMNS = [
    "id",
    "email",
    "phone",
    "name",
    "password_hash",
    "system_role",
    "created_at",
    "updated_at",
    "deleted_at",
];
function toEditEntity(row: Partial<User>): UserResponse {
    return {
        id: row.id!,
        email: row.email!,
        phone: row.phone!,
        name: row.name!,
        system_role: row.system_role!
    };
}


function toEntity(row: any): User {
    return new User({
        id: row.id,
        email: row.email,
        phone: row.phone,
        name: row.name,
        password_hash: row.password_hash,
        system_role: row.system_role,
        created_at: row.created_at,
        updated_at: row.updated_at,
        deleted_at: row.deleted_at,
    });
}


export async function findUserByEmail(email: string): Promise<User | undefined> {

    const row = await db("users")
        .select(USER_COLUMNS)
        .where("email", email)
        .whereNull("deleted_at")
        .first();

    return row ? (row) : undefined;
}


export async function findUserExitsByEmailOrPhone(email: string,phone : string): Promise<boolean> {

    const result = await db.raw(
        `SELECT EXISTS (SELECT 1 FROM users WHERE email= ? OR phone = ?)AS "exists" `,
        [email,phone]);
        return result.rows[0].exists;
}

export async function findUserExitsPhone(phone: string): Promise<boolean> {

    const result = await db.raw(
        `SELECT EXISTS (
            SELECT 1
            FROM users
            WHERE phone = ?
        ) AS "exists"`,
        [phone]
    );

    return result.rows[0].exists;
}

export async function findUserExitsByEmail(email: string): Promise<boolean> {

    const result = await db.raw(
        `SELECT EXISTS (SELECT 1 FROM users WHERE email= ?)AS "exists" `,
        [email]);
        return result.rows[0].exists;
}

export async function createUser(user:Partial<User>): Promise <User> {
    const [row]=await db("users").insert({
        email:user.email,
        phone : user.phone,
        name:user.name,
        password_hash:user.password_hash,
        system_role: user.system_role,
        created_at : user.created_at,
        deleted_at : user.deleted_at,
        updated_at : user.updated_at
    }).returning(USER_COLUMNS);

    return toEntity(row);
    
}

export async function updatePassword(id:number,password:string) {
    await db("users").where('id',id).update({password_hash:password})
}


export async function findUserById(id: number): Promise<User | undefined> {

    const row = await db("users")
        .select(USER_COLUMNS)
        .where("id", id).whereNull("deleted_at")
        .first();

    return row ? toEntity(row) : undefined;
}

export async function editUserNameAndPhone(
    id: number,
    name: string,
    phone: string
) {
    await db("users")
        .where("id", id)
        .update({
            name: name,
            phone: phone
        });

    const row = await db("users")
        .where("id", id)
        .first();

    return row ? toEditEntity(row) : undefined;
}