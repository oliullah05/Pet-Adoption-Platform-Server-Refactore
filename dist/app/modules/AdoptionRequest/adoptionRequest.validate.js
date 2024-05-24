"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestValidations = void 0;
const zod_1 = require("zod");
const createAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string({ required_error: "petId is required" }),
        message: zod_1.z.string({ required_error: "message is required" }),
        phoneNumber: zod_1.z.string({ required_error: "phoneNumber is required" }),
        address: zod_1.z.string({ required_error: "address is required" }),
        petOwnershipExperience: zod_1.z.string().optional(),
    })
});
const updateAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
        message: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        petOwnershipExperience: zod_1.z.string().optional(),
    })
});
exports.AdoptionRequestValidations = {
    createAdoptionRequest,
    updateAdoptionRequest
};
