"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "Password is required" }),
        emailOrName: zod_1.z.string({ required_error: "emailOrName is required" }),
    })
});
const changePassword = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required'
        }),
        newPassword: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long.' })
    })
});
exports.AuthValidations = {
    loginUser,
    changePassword
};
