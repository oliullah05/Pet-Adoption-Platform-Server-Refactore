"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const globalErrorHandler = (err, req, res, next) => {
    // res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    //     success: false,
    //     message: err.message || "Something Went Wrong!!",
    //     error:err
    // })
    let statusCode = 500;
    let message = err.message || 'Something went wrong!';
    let errorDetails = [
        {
            field: '',
            message: ""
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = '';
        errorDetails = {
            issues: simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources
        };
        errorDetails.issues.map((issu) => {
            // console.log({message :issu.message});
            message = message + issu.message + ". ";
        });
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorDetails = [
            {
                field: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError ||
        err instanceof jsonwebtoken_1.TokenExpiredError) {
        statusCode = 401;
        message = 'Unauthorized Access';
        errorDetails = err;
    }
    // for Error
    else if (err instanceof Error) {
        message = err.message || "Something Went Wrong";
        errorDetails = err;
    }
    //ultimate return
    return res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
        // error:err,
        // stack: config.node_env === 'development' ? err?.stack : null,
    });
};
exports.default = globalErrorHandler;
