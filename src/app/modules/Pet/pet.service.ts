import { Pet, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { petSearchableFields } from "./pet.const";





const createPet = async(payload:Pet)=>{
    const result = await prisma.pet.create({
        data:payload,
    })

    return result
}





const getAllPet = async (params:any, options:IPaginationOptions) => {

    const { searchTerm, ...filterData } = params;
 
    const { limit, page, sortBy, sortOrder, skip } = paginationHelper.calculatePagination(options)
    const andConditions: Prisma.PetWhereInput[]  = [];


    if (searchTerm) {
        andConditions.push({
            OR: petSearchableFields.map(field => ({
                [field]: {
                    contains:searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }


    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }



    const whereConditions: Prisma.PetWhereInput = { AND: andConditions }
    // console.dir(andConditions,{depth:"infinity"});
    const result = await prisma.pet.findMany({
        where: whereConditions ,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        },
    })

    const total = await prisma.pet.count({
        where: whereConditions
    })
    return {
        meta: {
            page,
            limit,
            total,
            showData:result.length

        },
        data: result
    }
}

const updateSinglePet = async(id:string,data:Partial<Pet>)=>{

    await prisma.pet.findUniqueOrThrow({
        where:{
            id
        }
    })

const result = await prisma.pet.update({
    where:{
        id
    },
    data:data
})
return result
}



export const PetServices = {
    getAllPet,
    createPet,
    updateSinglePet

}