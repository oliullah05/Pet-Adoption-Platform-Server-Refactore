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
exports.ProfileServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            role: true,
            age: true,
            address: true,
            status: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
const updateMe = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    console.log({ payload, id });
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: payload,
        select: {
            id: true,
            name: true,
            role: true,
            age: true,
            address: true,
            status: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
const changeUserRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: {
            role
        },
        select: {
            id: true,
            name: true,
            email: true,
            age: true,
            address: true,
            status: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
const changeUserStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: {
            status
        },
        select: {
            id: true,
            name: true,
            email: true,
            age: true,
            address: true,
            status: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });
    return result;
});
exports.ProfileServices = {
    getMe,
    updateMe,
    changeUserRole,
    changeUserStatus
};
