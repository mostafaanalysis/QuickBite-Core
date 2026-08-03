import { system_role_ent } from "../enums";

type UserProps = {
    id: number;
    email: string;
    phone: string;
    name: string;
    password_hash: string;
    system_role: system_role_ent;
    created_at: Date;
    deleted_at: Date | null;
    updated_at: Date;
};

export class User {
    id: number;
    email: string;
    phone: string;
    name: string;
    password_hash: string;
    system_role: system_role_ent;
    created_at: Date;
    deleted_at: Date | null;
    updated_at: Date;

    constructor(user: UserProps) {
        this.id = user.id;
        this.email = user.email;
        this.phone = user.phone;
        this.name = user.name;
        this.password_hash = user.password_hash;
        this.system_role = user.system_role;
        this.created_at = user.created_at ?? new Date();
        this.deleted_at = user.deleted_at ?? null;
        this.updated_at = user.updated_at ?? new Date();
    }
}