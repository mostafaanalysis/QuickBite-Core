import { PasswordResest } from "../entity/password-reset_entity";
import { db } from "../../../common/knex/knex";

const passwordResetsColumn = [
"id",
"user_id",
"otp_hash",
"expires_at",
"consumed_at",
"created_at",
];

function toentity(row: any): PasswordResest {
return new PasswordResest({
    id: row.id,
    userId: row.user_id,
    otpHash: row.otp_hash,
    expires_At: row.expires_at,
    consumed_At: row.consumed_at,
    created_At: row.created_at,
});
}

export async function CreatePasswordReset(
passwordResest: Partial<PasswordResest>
) {
const [row] = await db("password_resets")
    .insert({
user_id: passwordResest.userId,
otp_hash: passwordResest.otpHash,
expires_at: passwordResest.expires_At,
created_at: passwordResest.created_At,
    })
    .returning(passwordResetsColumn);

return toentity(row);
}

export async function findLatestPsswordResetByUserId(
    userId: number
): Promise<PasswordResest | undefined> {

    const row = await db("password_resets")
        .select(passwordResetsColumn)
        .where("user_id", userId)
        .whereNull("consumed_at")
        .orderBy("id", "desc")
        .first();

    if (!row) {
        return undefined;
    }

    return toentity(row);
}

export async function updatePasswordResetConsumedAt(id: number): Promise<void> {
    await db("password_resets")
        .where("id", id)
        .update({
            consumed_at: new Date(),
        });
}

