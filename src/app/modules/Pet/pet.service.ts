import { Prisma } from "@prisma/client";
import { Pet } from "../../../../prisma/generated/client";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { IPaginationOptions } from "../../interface/pagination";
import prisma from "../../shared/prisma";
import { petSearchableFields } from "./pet.const";
import { sendImageToCloudinary } from "../../helpers/fileUploader";




const createPet = async (payload: Pet,file:any) => {
    // console.log(file);
    if (file) {
        const path = file?.path
        const imageName = `${Math.random().toFixed(3).toString()} ${payload?.name}`
        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path)
        payload.bannerPhoto = secure_url as string
        console.log({payload});
      }
    const result = await prisma.pet.create({
        data: payload,
    })

    return result
}





const getAllPet = async (params: any, options: IPaginationOptions, query: Record<string, string>) => {
    console.log({ query });
    const { searchTerm, ...filterData } = params;

    const { limit, page, sortBy, sortOrder, skip } = paginationHelper.calculatePagination(options)
    const andConditions: Prisma.PetWhereInput[] = [];


    if (searchTerm) {
        andConditions.push({
            OR: petSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (query?.age) {
        andConditions.push({
            age: {
                equals: parseInt(query?.age)
            }
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key],

                }
            })

            )
        })
    }


    const whereConditions: Prisma.PetWhereInput = { AND: andConditions }
    // console.dir(andConditions,{depth:"infinity"});
    const result = await prisma.pet.findMany({
        where: whereConditions,
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
            total

        },
        data: result
    }
}

const updateSinglePet = async (id: string, data: Partial<Pet>) => {

    await prisma.pet.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.pet.update({
        where: {
            id
        },
        data: data
    })
    return result
}



export const PetServices = {
    getAllPet,
    createPet,
    updateSinglePet

}