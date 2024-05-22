"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const loginUser = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({ required_error: "Password is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }),
    })
});
exports.AuthValidations = {
    loginUser
};
