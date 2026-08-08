export const optionsAccess = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60*60*1000

}

export const optionsRefresh = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path : '/api/auth/refresh'
}