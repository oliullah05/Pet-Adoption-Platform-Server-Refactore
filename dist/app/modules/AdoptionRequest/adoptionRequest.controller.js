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
exports.AdoptionRequestControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const adoptionRequest_service_1 = require("./adoptionRequest.service");
const pick_1 = __importDefault(require("../../shared/pick"));
const adoptionRequest_const_1 = require("./adoptionRequest.const");
const createAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userEmail = req.user.email;
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.createAdoptionRequest(data, userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Adoption request submitted successfully",
        success: true,
        data: result
    });
}));
const getAllAdoptionRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.getAllAdoptionRequests();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Adoption requests retrieved successfully",
        success: true,
        data: result
    });
}));
const updateAdoptionRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = (0, pick_1.default)(req.body, adoptionRequest_const_1.adoptionRequestsUpdateableFields);
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.updateAdoptionRequests(id, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Adoption request updated successfully",
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
const myAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.myAdoptionRequest(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "My Adoption request retrieved successfully",
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
exports.AdoptionRequestControllers = {
    createAdoptionRequest,
    getAllAdoptionRequests,
    updateAdoptionRequests,
    myAdoptionRequest
};
