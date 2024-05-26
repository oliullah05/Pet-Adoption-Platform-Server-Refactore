import { Prisma } from "@prisma/client";
import { Pet } from "../../../../prisma/generated/client";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { IPaginationOptions } from "../../interface/pagination";
import prisma from "../../shared/prisma";
import { petSearchableFields } from "./pet.const";
import { sendImageToCloudinary } from "../../helpers/fileUploader";
import ApiError from "../../errors/ApiError";




const createPet = async (payload: Pet, file: any) => {
    if (file) {
        const path = file?.path
        const imageName = `${Date.now().toString()} ${payload?.name}`
        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path)
        payload.bannerPhoto = secure_url as string
        
    }
    const result = await prisma.pet.create({
        data: payload,
    })

    return result
}


const uploadMultiplePhotos = async (files:any,id:string) => {
await prisma.pet.findUniqueOrThrow({
    where:{
        id
    }
})

    if (!files || files.length <= 0) {
        throw new ApiError(404, "Multiple photos/files not found");
    }
    const multiplePhotos:string[] = [];

    // Using for...of loop to ensure await works properly
    for (const file of files) {
        const path = file?.path;
        const imageName = `${Date.now().toString()} ${file.originalname} + ${Math.round(Math.random() * 1e9)}`;
        
        // send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        
        multiplePhotos.push(secure_url as string);
    }

    const updatedPet =await prisma.pet.update({
        where:{
            id
        },
        data:{
            multiplePhotos
        }
    })
    return {
        multiplePhotos,
        updatedPet   
    };
};






const getAllPet = async (params: any, options: IPaginationOptions, query: Record<string, string>) => {
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


const getSinglePet = async(id:string)=>{
    const result = await prisma.pet.findUniqueOrThrow({
        where:{
            id
        }
    })
    return result
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

const deleteSinglePet = async (id: string) => {

    await prisma.pet.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.pet.delete({
        where: {
            id
        },

    })

    return result
}




const getUniqueAges = async()=>{
    const uniqueAges = await prisma.pet.groupBy({
        by: ['age'],
        _count: {
          age: true,
        },
      });
    
      const ages = uniqueAges.map((group) => group.age);
      ages.sort((a, b) => a - b);
      return ages;
}

const getUniqueBreeds = async()=>{
    const uniqueBreeds = await prisma.pet.groupBy({
        by: ['breed'],
        _count: {
          breed: true,
        },
      });
      const breeds = uniqueBreeds.map((group) => group.breed);
      return breeds;
}

const getUniqueLocations = async()=>{
    const uniqueLocations = await prisma.pet.groupBy({
        by: ['location'],
        _count: {
          location: true,
        },
      });
      const locations = uniqueLocations.map((group) => group.location);
      return locations;
}


const getUniqueSpecies = async()=>{
    const uniqueSpecies = await prisma.pet.groupBy({
        by: ['species'],
        _count: {
          species: true,
        },
      });
      const species = uniqueSpecies.map((group) => group.species);
      species.sort((a, b) => a.localeCompare(b));
      return species;
}

const getUniqueMedicalHistory = async()=>{
    const uniqueMedicalHistory = await prisma.pet.groupBy({
        by: ['medicalHistory'],
        _count: {
          medicalHistory: true,
        },
      });
      const medicalHistory = uniqueMedicalHistory.map((group) => group.medicalHistory);
      return medicalHistory;
}




export const PetServices = {
    getAllPet,
    getSinglePet,
    createPet,
    updateSinglePet,
    uploadMultiplePhotos,
    deleteSinglePet,
    getUniqueAges,
    getUniqueBreeds,
    getUniqueLocations,
    getUniqueSpecies,
    getUniqueMedicalHistory

}