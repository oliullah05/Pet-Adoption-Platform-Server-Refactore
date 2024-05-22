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
exports.ProfileControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const profile_service_1 = require("./profile.service");
const pick_1 = __importDefault(require("../../shared/pick"));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const result = yield profile_service_1.ProfileServices.getMe(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User profile retrieved successfully",
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
const updateMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if(Object.keys(req.body).length<0){
    //     throw new ApiError(500,"For update give some data first!!")
    // }
    const id = req.user.id;
    const data = (0, pick_1.default)(req.body, ["name", "email"]);
    const result = yield profile_service_1.ProfileServices.updateMe(id, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User profile updated successfully",
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
exports.ProfileControllers = {
    getMe,
    updateMe
};
