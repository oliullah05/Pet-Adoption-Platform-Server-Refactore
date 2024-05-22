import { AdoptionRequest } from "@prisma/client";
import prisma from "../../shared/prisma";

const createAdoptionRequest = async (payload: AdoptionRequest, email: string) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    });

await prisma.pet.findUniqueOrThrow({
    where:{
        id:payload.petId
    }
})

    payload.userId = userData.id;
    const result = await prisma.adoptionRequest.create({
        data: payload
    })

    return result;
}


const getAllAdoptionRequests = async()=>{
    const result = await prisma.adoptionRequest.findMany()
    return result
}

const updateAdoptionRequests = async(id:string,data:Partial<AdoptionRequest>)=>{

await prisma.adoptionRequest.findUniqueOrThrow({
    where:{
        id
    }
})

    const result = await prisma.adoptionRequest.update({
        where:{
            id
        },
        data:data
    })
    return result
    }
    

export const AdoptionRequestServices = {
    createAdoptionRequest,
    getAllAdoptionRequests,
    updateAdoptionRequests
}