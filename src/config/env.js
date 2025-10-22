import dotenv from 'dotenv'


dotenv.config()

export const env = {
    port: Number(process.env.PORT ?? 333),
    jwtSecret: process.env.JWT_SECRET ?? "change-me",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
    corsOrigin: process.env.CORS_ORIGIN ?? "*"
}