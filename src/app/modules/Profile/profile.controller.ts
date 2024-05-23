import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ProfileServices } from "./profile.service";
import pick from "../../shared/pick";




const getMe = catchAsync(async (req, res) => {
    const id = req.user.id;
    const result = await ProfileServices.getMe(id);
    sendResponse(res, {
        success: true,
        message: "User profile retrieved successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})

const updateMe = catchAsync(async (req, res) => {
    const id = req.user.id;
    const data = pick(req.body,["name","email"]) as {email:string,name:string}
    const result = await ProfileServices.updateMe(data,id);
    sendResponse(res, {
        success: true,
        message: "User profile updated successfully",
        statusCode: httpStatus.OK,
        data: result
    })
})


const changeUserRole = catchAsync(async (req, res) => {
    const id = req.params.id as string;
    const data = pick(req.body,["role"])

    const result = await ProfileServices.changeUserRole(id,data?.role);
    sendResponse(res, {
        success: true,
        message: "User role updated successfully",
        statusCode: httpStatus.OK,
        data: result
    })
})

const changeUserStatus = catchAsync(async (req, res) => {
    const id = req.params.id as string;
    const data = pick(req.body,["status"])

    const result = await ProfileServices.changeUserStatus(id,data?.status);
    sendResponse(res, {
        success: true,
        message: "User status updated successfully",
        statusCode: httpStatus.OK,
        data: result
    })
})




export const ProfileControllers = {
    getMe,
    updateMe,
    changeUserRole,
    changeUserStatus
}