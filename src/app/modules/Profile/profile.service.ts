import { User } from "@prisma/client";
import prisma from "../../shared/prisma";



const getMe = async (id: string) => {
    const result = await prisma.user.findUniqueOrThrow({
        where: {
           id
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return result;
}


const updateMe = async (id: string, data: Partial<User>) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.user.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return result;
}



export const ProfileServices = {
    getMe,
    updateMe
}