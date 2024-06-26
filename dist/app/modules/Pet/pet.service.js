"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetServices = void 0;
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const pet_const_1 = require("./pet.const");
const fileUploader_1 = require("../../helpers/fileUploader");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const createPet = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const path = file === null || file === void 0 ? void 0 : file.path;
        const imageName = `${Date.now().toString()} ${payload === null || payload === void 0 ? void 0 : payload.name}`;
        //send image to cloudinary
        const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
        payload.bannerPhoto = secure_url;
    }
    const result = yield prisma_1.default.pet.create({
        data: payload,
    });
    return result;
});
const updateSinglePet = (id, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id
        }
    });
    if (file) {
        const path = file === null || file === void 0 ? void 0 : file.path;
        const imageName = `${Date.now().toString()} ${data === null || data === void 0 ? void 0 : data.name}`;
        //send image to cloudinary
        const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
        data.bannerPhoto = secure_url;
    }
    const result = yield prisma_1.default.pet.update({
        where: {
            id
        },
        data: data
    });
    return result;
});
const uploadMultiplePhotos = (files, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: id.id
        }
    });
    if (!files || files.length <= 0) {
        throw new ApiError_1.default(404, "Multiple photos not found");
    }
    const multiplePhotos = [];
    // Using for...of loop to ensure await works properly
    for (const file of files) {
        const path = file === null || file === void 0 ? void 0 : file.path;
        const imageName = `${Date.now().toString()} ${file.originalname} + ${Math.round(Math.random() * 1e9)}`;
        // send image to cloudinary
        const { secure_url } = yield (0, fileUploader_1.sendImageToCloudinary)(imageName, path);
        multiplePhotos.push(secure_url);
    }
    const updatedPet = yield prisma_1.default.pet.update({
        where: {
            id: id.id
        },
        data: {
            multiplePhotos
        }
    });
    return {
        multiplePhotos,
        updatedPet
    };
});
const getAllPet = (params, options, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { limit, page, sortBy, sortOrder, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: pet_const_1.petSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    if (query === null || query === void 0 ? void 0 : query.age) {
        andConditions.push({
            age: {
                equals: parseInt(query === null || query === void 0 ? void 0 : query.age)
            }
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                }
            }))
        });
    }
    const whereConditions = { AND: andConditions };
    // console.dir(andConditions,{depth:"infinity"});
    const result = yield prisma_1.default.pet.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        },
    });
    const total = yield prisma_1.default.pet.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getSinglePet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id
        }
    });
    return result;
});
const deleteSinglePet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.pet.delete({
        where: {
            id
        },
    });
    return result;
});
const getUniqueAges = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueAges = yield prisma_1.default.pet.groupBy({
        by: ['age'],
        _count: {
            age: true,
        },
    });
    const ages = uniqueAges.map((group) => group.age);
    ages.sort((a, b) => a - b);
    return ages;
});
const getUniqueBreeds = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueBreeds = yield prisma_1.default.pet.groupBy({
        by: ['breed'],
        _count: {
            breed: true,
        },
    });
    const breeds = uniqueBreeds.map((group) => group.breed);
    return breeds;
});
const getUniqueLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueLocations = yield prisma_1.default.pet.groupBy({
        by: ['location'],
        _count: {
            location: true,
        },
    });
    const locations = uniqueLocations.map((group) => group.location);
    return locations;
});
const getUniqueSpecies = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueSpecies = yield prisma_1.default.pet.groupBy({
        by: ['species'],
        _count: {
            species: true,
        },
    });
    const species = uniqueSpecies.map((group) => group.species);
    species.sort((a, b) => a.localeCompare(b));
    return species;
});
const getUniqueMedicalHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const uniqueMedicalHistory = yield prisma_1.default.pet.groupBy({
        by: ['medicalHistory'],
        _count: {
            medicalHistory: true,
        },
    });
    const medicalHistory = uniqueMedicalHistory.map((group) => group.medicalHistory);
    return medicalHistory;
});
exports.PetServices = {
    getAllPet,
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
};
