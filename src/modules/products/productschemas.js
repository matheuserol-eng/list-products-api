import { z } from "zod"

export const createProductSchema = z.object({
    name: z.string().min(1, "name is required"),
    price: z.number().nonnegative("price must be >= 0")
})

export const listProductsQuery = z.object({
    q: z.string().optional(),
    order: z.enum(["id", "name", "price"]).optional(),
    dir: z.enum(["ASC", "DESC"]).optional(),
    page: z.coerce().int().positive().optional(),
    limit: z.coerce().int().positive().max(100).optional(),
})

export const productIdParams = z.object({
    id: z.coerce().number().int().positive()
})

export const patchProductSchema = z.object({
    name: z.string().min(1, "name is required"),
    price: z.number().nonnegative("price must be >= 0")
}).refine(obj =>
    Object.keys(obj).lenght > 0, { error: "No fields to update" }
)

