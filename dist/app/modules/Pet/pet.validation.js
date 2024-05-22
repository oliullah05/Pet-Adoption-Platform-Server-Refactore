"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetValidations = void 0;
const zod_1 = require("zod");
const PetSizeEnum = zod_1.z.enum(['small', 'medium', 'large']);
const createPet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        species: zod_1.z.string({ required_error: "Species is required" }),
        breed: zod_1.z.string({ required_error: "Breed is required" }),
        age: zod_1.z.number({ required_error: "Age is required" }).int(),
        size: PetSizeEnum,
        location: zod_1.z.string({ required_error: "Location is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        temperament: zod_1.z.string({ required_error: "Temperament is required" }),
        medicalHistory: zod_1.z.string({ required_error: "MedicalHistory is required" }),
        adoptionRequirements: zod_1.z.string({ required_error: "AdoptionRequirements is required" })
    })
});
const updatePet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        species: zod_1.z.string().optional(),
        breed: zod_1.z.string().optional(),
        age: zod_1.z.number().int().optional(),
        size: PetSizeEnum.optional(),
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        temperament: zod_1.z.string().optional(),
        medicalHistory: zod_1.z.string().optional(),
        adoptionRequirements: zod_1.z.string().optional()
    })
});
exports.PetValidations = {
    createPet,
    updatePet
};
