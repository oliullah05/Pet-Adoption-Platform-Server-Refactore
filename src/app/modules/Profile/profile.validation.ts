import { z } from "zod";

const updateMe = z.object({
    body:z.object({
        name:z.string().optional(),
        email:z.string().optional()
    })
})
const changeUserRole = z.object({
    body:z.object({
        role:z.enum(["admin","user"],{required_error:"Role is required"})
    })
})

export const ProfileValidations = {
    updateMe,
    changeUserRole
}