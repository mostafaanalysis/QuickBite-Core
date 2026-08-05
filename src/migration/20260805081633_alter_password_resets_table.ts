import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`CREATE INDEX idx_password_resets_user_id 
        ON password_resets(user_id);

        ALTER TABLE password_resets ALTER COLUMN consumed_at DROP NOT NULL;`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP INDEX IF EXISTS idx_password_resets_user_id;

        ALTER TABLE password_resets
        ALTER COLUMN consumed_at SET NOT NULL;
    `);
}

