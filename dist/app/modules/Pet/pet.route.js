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
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.PetValidations.createPet), pet_controller_1.PetControllers.createPet);
router.get("/", (0, auth_1.default)(), pet_controller_1.PetControllers.getAllPets);
router.put("/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.PetValidations.updatePet), pet_controller_1.PetControllers.updateSinglePet);
exports.PetRoutes = router;
