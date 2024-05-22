import { z } from "zod";
const PetSizeEnum = z.enum(['small', 'medium', 'large']);
const createPet = z.object({
body:z.object({   
  name: z.string({required_error:"Name is required"}),
  species: z.string({required_error:"Species is required"}),
  breed: z.string({required_error:"Breed is required"}),
  age: z.number({required_error:"Age is required"}).int(),
  size: PetSizeEnum,
  location: z.string({required_error:"Location is required"}),
  description: z.string({required_error:"Description is required"}),
  temperament: z.string({required_error:"Temperament is required"}),
  medicalHistory: z.string({required_error:"MedicalHistory is required"}),
  adoptionRequirements: z.string({required_error:"AdoptionRequirements is required"})
    })
})
const updatePet = z.object({
body:z.object({   
  name: z.string().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  age: z.number().int().optional(),
  size: PetSizeEnum.optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  temperament: z.string().optional(),
  medicalHistory: z.string().optional(),
  adoptionRequirements: z.string().optional()
    })
})

export const PetValidations = {
    createPet,
    updatePet
}