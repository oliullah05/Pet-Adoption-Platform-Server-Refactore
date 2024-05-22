"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adoptionRequest_controller_1 = require("./adoptionRequest.controller");
const auth_1 = __importDefault(require("../../middlewars/auth"));
const validateRequest_1 = __importDefault(require("../../middlewars/validateRequest"));
const adoptionRequest_validate_1 = require("./adoptionRequest.validate");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(adoptionRequest_validate_1.AdoptionRequestValidations.createAdoptionRequest), adoptionRequest_controller_1.AdoptionRequestControllers.createAdoptionRequest);
router.get("/", (0, auth_1.default)(), adoptionRequest_controller_1.AdoptionRequestControllers.getAllAdoptionRequests);
router.put("/:id", (0, auth_1.default)(), (0, validateRequest_1.default)(adoptionRequest_validate_1.AdoptionRequestValidations.updateAdoptionRequest), adoptionRequest_controller_1.AdoptionRequestControllers.updateAdoptionRequests);
exports.AdoptionRequestRoutes = router;
