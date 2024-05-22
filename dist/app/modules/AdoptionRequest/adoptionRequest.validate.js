"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestValidations = void 0;
const zod_1 = require("zod");
const createAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string({ required_error: "petId is required" }),
        petOwnershipExperience: zod_1.z.string({ required_error: "petOwnershipExperience is required" })
    })
});
const updateAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]),
        petOwnershipExperience: zod_1.z.string(),
    })
});
exports.AdoptionRequestValidations = {
    createAdoptionRequest,
    updateAdoptionRequest
};
