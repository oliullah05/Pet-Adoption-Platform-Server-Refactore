import { User } from "@prisma/client";
import prisma from "../../shared/prisma";
import { Role } from "../../../../prisma/generated/client";


const getMe = async (id: string) => {
    const result = await prisma.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            role:true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return result;
}


const updateMe = async (payload: {email:string,name:string}, id: string) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
        select: {
            id: true,
            name: true,
            role:true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return result;
}


const changeUserRole = async (id: string,role:Role) => {
    await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    })

    const result = await prisma.user.update({
        where: {
            id
        },
        data:{
            role
        },
        select: {
            id: true,
            name: true,
            email: true,
            role:true,
            createdAt: true,
            updatedAt: true
        }
    })

    return result;
}







export const ProfileServices = {
    getMe,
    updateMe,
    changeUserRole
}