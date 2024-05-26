"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewars/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewars/auth"));
const router = express_1.default.Router();
router.get("/user", (0, auth_1.default)("admin"), user_controller_1.UserControllers.getAllUser);
router.post("/register", (0, validateRequest_1.default)(user_validation_1.UserValidations.createUser), user_controller_1.UserControllers.createUser);
exports.UserRoutes = router;
