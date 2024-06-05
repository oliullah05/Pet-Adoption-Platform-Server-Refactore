import { z } from "zod";

const updateMe = z.object({
    body:z.object({
        name:z.string({invalid_type_error:"name must be string"}).optional(),
        email:z.string({invalid_type_error:"email must be string"}).optional(),
        age:z.number({invalid_type_error:"age must be number"}).optional(),
        address:z.string({invalid_type_error:"address must be string"}).optional()
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