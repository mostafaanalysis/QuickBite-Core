declare namespace Express{
    interface Request{
        correlationId?:string;
        user?:{
            userId:number;
            role:system_role_ent;
            email:string;
        }
    }
}