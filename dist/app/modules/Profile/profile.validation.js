"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidations = void 0;
const zod_1 = require("zod");
const updateMe = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
    })
});
exports.ProfileValidations = {
    updateMe
};
