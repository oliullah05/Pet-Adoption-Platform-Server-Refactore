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

const updateSinglePet = catchAsync(async (req, res) => {
   
    const id = req.params.id;
    const data = pick(req.body, petUpdateableFields);
    const file = req.file
    const result = await PetServices.updateSinglePet(id, data,file);
    sendResponse(res, {
        success: true,
        message: "Pet profile updated successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})

const uploadMultiplePhotos = catchAsync(async (req, res) => {
    const id = req.body
    const files = req.files
    const result = await PetServices.uploadMultiplePhotos(files, id);
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


const getSinglePet = catchAsync(async (req, res) => {

    const id = req.params.id
    const result = await PetServices.getSinglePet(id);
    sendResponse(res, {
        success: true,
        message: "Pet is retrieved successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})




const deleteSinglePet = catchAsync(async (req, res) => {

    const id = req.params.id;

    const result = await PetServices.deleteSinglePet(id);
    sendResponse(res, {
        success: true,
        message: "Pet deleted successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})


const getUniqueAges = catchAsync(async (req, res) => {

    const result = await PetServices.getUniqueAges();
    sendResponse(res, {
        success: true,
        message: "Pets uniqueAges  get successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})

const getUniqueBreeds = catchAsync(async (req, res) => {

    const result = await PetServices.getUniqueBreeds();
    sendResponse(res, {
        success: true,
        message: "Pets uniqueBreeds  get successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})

const getUniqueLocations = catchAsync(async (req, res) => {

    const result = await PetServices.getUniqueLocations();
    sendResponse(res, {
        success: true,
        message: "Pets uniqueLocations  get successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})
const getUniqueSpecies = catchAsync(async (req, res) => {

    const result = await PetServices.getUniqueSpecies();
    sendResponse(res, {
        success: true,
        message: "Pets uniqueSpecies  get successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})



const getUniqueMedicalHistory = catchAsync(async (req, res) => {

    const result = await PetServices.getUniqueMedicalHistory();
    sendResponse(res, {
        success: true,
        message: "Pets uniqueMedicalHistory  get successfully",
        statusCode: httpStatus.OK,
        data: result
    })

})







export const PetControllers = {
    getAllPets,
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