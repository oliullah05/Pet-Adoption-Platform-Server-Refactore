import { z } from "zod";

const updateMe = z.object({
    body:z.object({
        name:z.string().optional(),
        email:z.string().optional(),
        role:z.enum(["admin","user"]).optional()
    })
})

export const ProfileValidations = {
    updateMe
}