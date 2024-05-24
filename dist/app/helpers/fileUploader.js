"use strict";
// import { v2 as cloudinary } from 'cloudinary';
// import multer from "multer";
// import path from "path";
// import fs from "fs"
// import { ICloudinaryResponse, IFileUpload } from '../interface/fileUpload';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.sendImageToCloudinary = void 0;
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(),"uploads"))
//     },
//     filename: function (req, file, cb) {
//         //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         //   cb(null, file.fieldname + '-' + uniqueSuffix)
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage });
// // ------------------------
// cloudinary.config({
//     cloud_name: 'ddbkkucbm',
//     api_key: '213212774316986',
//     api_secret: '9_Q4a16YUsDjML3zoZwB5ACQBmA'
//   });
// const uploadToClodinary = async(file:IFileUpload):Promise<ICloudinaryResponse |undefined>=>{
//     // console.log({file},88887777);
// return new Promise((resolve,reject)=>{
//   cloudinary.uploader.upload(
//     // "D:\\Level-2\\FullStackPath\\Module-25-healthcare-server\\uploads\\logo.jpg",
// file.path,
//     // { public_id: file.originalname},
//     (error:Error, result:ICloudinaryResponse) =>{
//         fs.unlinkSync(file.path)
//   if(error){
//     reject(error)
//   }
//   else{
//     resolve(result)
//   }
//     });
// })
// }
// export const fileUploader = {
//     upload,
//     uploadToClodinary
// }
// ................................................................................................................................................................................................................................
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
cloudinary_1.v2.config({
    cloud_name: "ddbkkucbm",
    api_key: "213212774316986",
    api_secret: "9_Q4a16YUsDjML3zoZwB5ACQBmA"
});
const sendImageToCloudinary = (imageName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, { public_id: imageName.trim() }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            // delete a file asynchronously
            fs_1.default.unlink(path, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('File is deleted.');
                }
            });
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
