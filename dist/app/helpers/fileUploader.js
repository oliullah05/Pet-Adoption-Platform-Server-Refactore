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
exports.fileUploader = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //   cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// ------------------------
cloudinary_1.v2.config({
    cloud_name: 'ddbkkucbm',
    api_key: '213212774316986',
    api_secret: '9_Q4a16YUsDjML3zoZwB5ACQBmA'
});
const uploadToClodinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({file},88887777);
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(
        // "D:\\Level-2\\FullStackPath\\Module-25-healthcare-server\\uploads\\logo.jpg",
        file.path, 
        // { public_id: file.originalname},
        (error, result) => {
            fs_1.default.unlinkSync(file.path);
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.fileUploader = {
    upload,
    uploadToClodinary
};
