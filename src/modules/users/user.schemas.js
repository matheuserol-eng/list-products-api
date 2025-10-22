import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "password must be at least 6 chars"),
})

export const login = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "password must be at least 6 chars"),
})
