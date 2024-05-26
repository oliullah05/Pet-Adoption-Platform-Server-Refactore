"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetRoutes = void 0;
const express_1 = __importDefault(require("express"));
const pet_validation_1 = require("./pet.validation");
const pet_controller_1 = require("./pet.controller");
const validateRequest_1 = __importDefault(require("../../middlewars/validateRequest"));
const auth_1 = __importDefault(require("../../middlewars/auth"));
const fileUploader_1 = require("../../helpers/fileUploader");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin"), fileUploader_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    console.log({ file: req.file, body: req.body });
    next();
}, (0, validateRequest_1.default)(pet_validation_1.PetValidations.createPet), pet_controller_1.PetControllers.createPet);
router.post("/upload-multiple-photos", (0, auth_1.default)("admin"), fileUploader_1.upload.array("files"), pet_controller_1.PetControllers.uploadMultiplePhotos);
router.get("/", pet_controller_1.PetControllers.getAllPets);
router.get("/:id", (0, auth_1.default)(), pet_controller_1.PetControllers.getSinglePet);
router.put("/:id", (0, auth_1.default)("admin"), (0, validateRequest_1.default)(pet_validation_1.PetValidations.updatePet), pet_controller_1.PetControllers.updateSinglePet);
router.delete("/:id", (0, auth_1.default)("admin"), pet_controller_1.PetControllers.deleteSinglePet);
exports.PetRoutes = router;
