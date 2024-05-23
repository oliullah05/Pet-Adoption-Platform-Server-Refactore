
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../shared/prisma";
import bcrypt from "bcrypt"


const loginUser = async (payload: { emailOrName: string, password: string }) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
          OR: [
            { email: payload.emailOrName },
            { name: payload.emailOrName }
          ]
        },
      })


    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect")
    }

    const jwtPayload = { email: userData.email,id:userData.id,role:userData.role }
    
    const accessToken = jwtHelpers.genarateToken(jwtPayload, config.jwt.jwt_access_secret as string, config.jwt.jwt_access_expaire_in as string)

    return {
        id:userData.id,
        name:userData.name,
        email:userData.email,
        role:userData.role,
        token:accessToken,
    }

}










export const AuthServices = {
    loginUser
  
}