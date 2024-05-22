import { z } from "zod";

const loginUser = z.object({
    body:z.object({
        password:z.string({required_error:"Password is required"}),
        emailOrName:z.string({required_error:"emailOrName is required"}),
    })
})

export const AuthValidations = {
    loginUser
}