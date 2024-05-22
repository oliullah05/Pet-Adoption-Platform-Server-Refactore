"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewars/validateRequest"));
const profile_controller_1 = require("./profile.controller");
const auth_1 = __importDefault(require("../../middlewars/auth"));
const profile_validation_1 = require("./profile.validation");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), profile_controller_1.ProfileControllers.getMe);
router.put("/", (0, auth_1.default)(), (0, validateRequest_1.default)(profile_validation_1.ProfileValidations.updateMe), profile_controller_1.ProfileControllers.updateMe);
exports.ProfileRoutes = router;
