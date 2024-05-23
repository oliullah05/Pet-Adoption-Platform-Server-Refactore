import config from "../../config";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import prisma from "../../shared/prisma";
import bcrypt, { compare } from "bcrypt"


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
        throw new ApiError(400,"Password incorrect")
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



const changePassword = async(user:any,payload:{oldPassword:string,newPassword:string})=>{
 const userData =  await prisma.user.findUniqueOrThrow({
    where:{
      id:user.id
    }
  })

// check old password is correct


// later
const isPasswordMatced = await bcrypt.compare(payload.oldPassword, userData.password);

if(!isPasswordMatced){
  throw new ApiError(404,"Password do not match")
}

const hashNewPassword = await bcrypt.hash(payload.newPassword,Number(process.env.BCRYPT_SALT_ROUND))


await prisma.user.update({
  where:{
    id:user.id
  },
  data:{
    password:hashNewPassword
  }
})

return null

}





export const AuthServices = {
    loginUser,
    changePassword
  
}