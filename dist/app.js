"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewars/globalErrorHandler"));
const app = (0, express_1.default)();
// middlewars
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send({
        message: "Pet-Adoption server is running"
    });
});
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found"
        }
    });
});
exports.default = app;
