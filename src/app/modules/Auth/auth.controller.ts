import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        success: true,
        data: result
    })
})
const changePassword = catchAsync(async (req, res) => {
    const user = req.user;
    const data = req.body
    const result = await AuthServices.changePassword(user,data);
    sendResponse(res, {
        success: true,
        message: "Password change successfully",
        statusCode: httpStatus.OK,
        data: result
    })
})


export const AuthControllers = {
    loginUser,
    changePassword
}