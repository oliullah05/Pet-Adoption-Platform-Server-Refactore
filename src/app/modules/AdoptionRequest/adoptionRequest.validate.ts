import {z} from "zod"

const createAdoptionRequest = z.object({
    body:z.object({
        petId:z.string({required_error:"petId is required"}),
        petOwnershipExperience:z.string({required_error:"petOwnershipExperience is required"})

    })
})
const updateAdoptionRequest = z.object({
    body:z.object({
        status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
        petOwnershipExperience: z.string(),
    })
})


export const AdoptionRequestValidations= {
    createAdoptionRequest,
    updateAdoptionRequest
}