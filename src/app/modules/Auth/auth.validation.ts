import { z } from "zod";

const loginUser = z.object({
    body:z.object({
        password:z.string({required_error:"Password is required"}),
        emailOrName:z.string({required_error:"emailOrName is required"}),
    })
})


const changePassword = z.object({
    body: z.object({
      oldPassword: z.string({
        required_error: 'Old password is required'
      }),
      newPassword: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters long.' })
    })
  })
  
export const AuthValidations = {
    loginUser,
    changePassword
}