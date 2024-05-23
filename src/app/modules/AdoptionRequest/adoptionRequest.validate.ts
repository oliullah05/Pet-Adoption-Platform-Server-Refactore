import {z} from "zod"

const createAdoptionRequest = z.object({
    body:z.object({
        petId:z.string({required_error:"petId is required"}),
        message:z.string({required_error:"message is required"}),
        phoneNumber:z.string({required_error:"phoneNumber is required"}),
        address:z.string({required_error:"address is required"}),
        petOwnershipExperience:z.string().optional(),
    })
})
const updateAdoptionRequest = z.object({
    body:z.object({
        status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
        message:z.string().optional(),
        phoneNumber:z.string().optional(),
        address:z.string().optional(),
        petOwnershipExperience:z.string().optional(),
    })
})


export const AdoptionRequestValidations= {
    createAdoptionRequest,
    updateAdoptionRequest
}