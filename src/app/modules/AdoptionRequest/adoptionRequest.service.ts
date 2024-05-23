
import { AdoptionRequest } from "@prisma/client";
import prisma from "../../shared/prisma";

interface PetInfo {
    petId: string;
    address: string;
    phoneNumber: string;
    message: string;
    userId: string

}


const createAdoptionRequest = async (payload: PetInfo, email: string) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    });

    await prisma.pet.findUniqueOrThrow({
        where: {
            id: payload.petId
        }
    })

    payload.userId = userData.id;
    const result = await prisma.adoptionRequest.create({
        data: payload
    })

    return result;
}


const getAllAdoptionRequests = async () => {
    const result = await prisma.adoptionRequest.findMany()
    return result
}

const updateAdoptionRequests = async (id: string, data: Partial<AdoptionRequest>) => {

    await prisma.adoptionRequest.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.adoptionRequest.update({
        where: {
            id
        },
        data
    })
    return result
}


const myAdoptionRequest = async (id: string) => {
await prisma.user.findUniqueOrThrow({
    where:{
        id
    }
})

const result = await prisma.adoptionRequest.findMany({
    where:{
        userId:id
    }
})

return result

}






export const AdoptionRequestServices = {
    createAdoptionRequest,
    getAllAdoptionRequests,
    updateAdoptionRequests,
    myAdoptionRequest
}