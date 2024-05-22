import { z } from "zod";
const PetSizeEnum = z.enum(['small', 'medium', 'large']);
const GenderEnum = z.enum(['male', 'female']);

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


const createPet = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    species: z.string({ required_error: "Species is required" }),
    bannerPhoto: z.string({ required_error: "Banner Photo is required" }).optional(),
    multiplePhotos: z.array(z.string({ required_error: "Photo URL is required" }), { required_error: "Multiple Photos are required" }).optional(),
    breed: z.string({ required_error: "Breed is required" }),
    age: z.number({ required_error: "Age is required" }).int(),
    specialNeeds: z.string({ required_error: "Special Needs is required" }),
    size: PetSizeEnum,
    gender: GenderEnum,
    location: z.string({ required_error: "Location is required" }),
    healthStatus: z.string({ required_error: "Health Status is required" }),
    description: z.string({ required_error: "Description is required" }),
    temperament: z.string({ required_error: "Temperament is required" }),
    medicalHistory: z.string({ required_error: "Medical History is required" }),
    adoptionRequirements: z.string({ required_error: "Adoption Requirements are required" })
  })
});


const updatePet = z.object({
  body: z.object({
    name: z.string().optional(),
    species: z.string().optional(),
    bannerPhoto: z.string().optional(),
    multiplePhotos: z.array(z.string().optional()).optional(),
    breed: z.string().optional(),
    age: z.number().int().optional(),
    specialNeeds: z.string().optional(),
    size: PetSizeEnum.optional(),
    gender: GenderEnum.optional(),
    location: z.string().optional(),
    healthStatus: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional()
  }).optional()
})

export const PetValidations = {
    createPet,
    updatePet
}