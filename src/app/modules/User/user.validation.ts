import { z } from "zod";

const createUser = z.object({
    body:z.object({
        password:z.string({required_error:"Password is required"}),
        name:z.string({required_error:"Name is required"}),
        email:z.string({required_error:"Email is required"}),
    })
})
const updateMe = z.object({
    body:z.object({
        name:z.string().optional(),
        email:z.string().optional(),
    })
})

export const UserValidations = {
    createUser,
    updateMe
}