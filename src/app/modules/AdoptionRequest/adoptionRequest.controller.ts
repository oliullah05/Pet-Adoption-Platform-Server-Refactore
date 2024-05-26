import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AdoptionRequestServices } from "./adoptionRequest.service";
import pick from "../../shared/pick";
import { adoptionRequestsUpdateableFields } from "./adoptionRequest.const";

const createAdoptionRequest = catchAsync(async(req,res)=>{
const data = req.body;
const userEmail = req.user.email;
const result = await AdoptionRequestServices.createAdoptionRequest(data,userEmail)

sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Adoption request submitted successfully",
    success: true,
    data: result
})


})


const getAllAdoptionRequests = catchAsync(async(req,res)=>{
const result = await AdoptionRequestServices.getAllAdoptionRequests()
sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    success: true,
    data: result
})

})





const updateAdoptionRequests = catchAsync(async (req, res) => {

    const id = req.params.id;
    const data = pick(req.body, adoptionRequestsUpdateableFields);
    const result = await AdoptionRequestServices.updateAdoptionRequests(id, data);
    sendResponse(res, {
        success: true,
        message: "Adoption request updated successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})

const myAdoptionRequest = catchAsync(async (req, res) => {
    const id = req.user.id;
    const result = await AdoptionRequestServices.myAdoptionRequest(id);
    sendResponse(res, {
        success: true,
        message: "My Adoption request retrieved successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})
const myAdoptedPets = catchAsync(async (req, res) => {
    const id = req.user.id;
    const result = await AdoptionRequestServices.myAdoptedPets(id);
    sendResponse(res, {
        success: true,
        message: "My Adopted pets retrieved successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})







export const AdoptionRequestControllers = {
    createAdoptionRequest,
    getAllAdoptionRequests,
    updateAdoptionRequests,
    myAdoptionRequest,
    myAdoptedPets
}