import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { userFilterableFields } from "./user.const";
import { UserServices } from "./user.service";


const createUser = catchAsync(async (req, res) => {

    const userData = req.body;
    const result = await UserServices.createUser(userData);
    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: httpStatus.CREATED,
        data: result
    })

})


const getAllUser = catchAsync(async (req, res) => {

    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ['page', "limit", "sortBy", "sortOrder"]);
    const result = await UserServices.getAllUser(filters, options);
    sendResponse(res, {
        success: true,
        message: "Users are retrieve successfully",
        statusCode: httpStatus.OK,
        meta: result.meta,
        data: result.data
    })

})


const getMe = catchAsync(async (req, res) => {
    const email = req.user.email;
    const result = await UserServices.getMe(email);
    sendResponse(res, {
        success: true,
        message: "User profile retrieved successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})


const updateMe = catchAsync(async (req, res) => {
    const data = req.body;
    const email = req.user.email;
    const result = await UserServices.updateMe(data,email);
    sendResponse(res, {
        success: true,
        message: "User profile updated successfully",
        statusCode: httpStatus.CREATED,
        data: result
    })

})







export const UserControllers = {
    getAllUser,
    createUser,
    getMe,
    updateMe
}