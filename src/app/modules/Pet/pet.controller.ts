import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PetServices } from "./pet.service";
import pick from "../../shared/pick";
import { petFilterableFields, petUpdateableFields } from "./pet.const";


const createPet = catchAsync(async (req, res) => {
    const file = req.file
    const petData = req.body;
    const result = await PetServices.createPet(petData, file);
    sendResponse(res, {
        success: true,
        message: "Pet added successfully",
        statusCode: httpStatus.CREATED,
        data: result
    })

})

const uploadMultiplePhotos = catchAsync(async (req, res) => {
   const id = req.body.id
    const files = req.files
    const result = await PetServices.uploadMultiplePhotos(files,id);
    sendResponse(res, {
        success: true,
        message: "Multiple Photo Uploaded Successfully",
        statusCode: httpStatus.CREATED,
        data: result
    })

})


const getAllPets = catchAsync(async (req, res) => {

    const filters = pick(req.query, petFilterableFields);
    const options = pick(req.query, ['page', "limit", "sortBy", "sortOrder", "age"]);
    const result = await PetServices.getAllPet(filters, options, req.query as Record<string, string>);
    sendResponse(res, {
        success: true,
        message: "Pets retrieved successfully",
        statusCode: httpStatus.OK,
        meta: result.meta,
        data: result.data
    })

})
const updateSinglePet = catchAsync(async (req, res) => {

    const id = req.params.id;
    const data = pick(req.body, petUpdateableFields);
    const result = await PetServices.updateSinglePet(id, data);
    sendResponse(res, {
        success: true,
        message: "Pet profile updated successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})



export const PetControllers = {
    getAllPets,
    createPet,
    updateSinglePet,
    uploadMultiplePhotos
}