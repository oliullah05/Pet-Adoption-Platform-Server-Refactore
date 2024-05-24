"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetValidations = void 0;
const zod_1 = require("zod");
const PetSizeEnum = zod_1.z.enum(['small', 'medium', 'large']);
const GenderEnum = zod_1.z.enum(['male', 'female']);
// const createPet = z.object({
// body:z.object({   
//   name: z.string({required_error:"Name is required"}),
//   species: z.string({required_error:"Species is required"}),
//   breed: z.string({required_error:"Breed is required"}),
//   age: z.number({required_error:"Age is required"}).int(),
//   size: PetSizeEnum,
//   location: z.string({required_error:"Location is required"}),
//   description: z.string({required_error:"Description is required"}),
//   temperament: z.string({required_error:"Temperament is required"}),
//   medicalHistory: z.string({required_error:"MedicalHistory is required"}),
//   adoptionRequirements: z.string({required_error:"AdoptionRequirements is required"})
//     })
// })
const createPet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        species: zod_1.z.string({ required_error: "Species is required" }),
        bannerPhoto: zod_1.z.string({ required_error: "Banner Photo is required" }).optional(),
        multiplePhotos: zod_1.z.array(zod_1.z.string({ required_error: "Photo URL is required" }), { required_error: "Multiple Photos are required" }).optional(),
        breed: zod_1.z.string({ required_error: "Breed is required" }),
        age: zod_1.z.number({ required_error: "Age is required" }).int(),
        specialNeeds: zod_1.z.string({ required_error: "Special Needs is required" }),
        size: PetSizeEnum,
        gender: GenderEnum,
        location: zod_1.z.string({ required_error: "Location is required" }),
        healthStatus: zod_1.z.string({ required_error: "Health Status is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        temperament: zod_1.z.string({ required_error: "Temperament is required" }),
        medicalHistory: zod_1.z.string({ required_error: "Medical History is required" }),
        adoptionRequirements: zod_1.z.string({ required_error: "Adoption Requirements are required" })
    })
});
const updatePet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        species: zod_1.z.string().optional(),
        bannerPhoto: zod_1.z.string().optional(),
        multiplePhotos: zod_1.z.array(zod_1.z.string().optional()).optional(),
        breed: zod_1.z.string().optional(),
        age: zod_1.z.number().int({ message: "Age must be number" }).optional(),
        specialNeeds: zod_1.z.string().optional(),
        size: PetSizeEnum.optional(),
        gender: GenderEnum.optional(),
        location: zod_1.z.string().optional(),
        healthStatus: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        temperament: zod_1.z.string().optional(),
        medicalHistory: zod_1.z.string().optional(),
        adoptionRequirements: zod_1.z.string().optional()
    }).optional()
});
exports.PetValidations = {
    createPet,
    updatePet
};
