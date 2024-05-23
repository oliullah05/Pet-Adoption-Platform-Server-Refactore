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
const changeUserStatus = z.object({
    body:z.object({
        status:z.enum(["active","deactive","blocked"],{required_error:"status is required"})
    })
})

export const ProfileValidations = {
    updateMe,
    changeUserRole,
    changeUserStatus
}