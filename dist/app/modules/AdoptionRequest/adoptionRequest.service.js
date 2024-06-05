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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createAdoptionRequest = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email
        }
    });
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: payload.petId
        }
    });
    payload.userId = userData.id;
    const result = yield prisma_1.default.adoptionRequest.create({
        data: payload
    });
    return result;
});
const getAllAdoptionRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.adoptionRequest.findMany({
        include: {
            pet: true
        }
    });
    return result;
});
const updateAdoptionRequests = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id
        },
        data
    });
    return result;
});
const myAdoptionRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.adoptionRequest.findMany({
        where: {
            userId: id
        }
    });
    return result;
});
const myAdoptedPets = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.adoptionRequest.findMany({
        where: {
            userId: id,
            status: "APPROVED"
        },
        include: {
            pet: true
        }
    });
    return result;
});
exports.AdoptionRequestServices = {
    createAdoptionRequest,
    getAllAdoptionRequests,
    updateAdoptionRequests,
    myAdoptionRequest,
    myAdoptedPets
};
