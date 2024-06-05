"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidations = void 0;
const zod_1 = require("zod");
const updateMe = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: "name must be string" }).optional(),
        email: zod_1.z.string({ invalid_type_error: "email must be string" }).optional(),
        age: zod_1.z.number({ invalid_type_error: "age must be number" }).optional(),
        address: zod_1.z.string({ invalid_type_error: "address must be string" }).optional()
    })
});
const changeUserRole = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(["admin", "user"], { required_error: "Role is required" })
    })
});
const changeUserStatus = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["active", "deactive", "blocked"], { required_error: "status is required" })
    })
});
exports.ProfileValidations = {
    updateMe,
    changeUserRole,
    changeUserStatus
};
