"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const pet_route_1 = require("../modules/Pet/pet.route");
const adoptionRequest_route_1 = require("../modules/AdoptionRequest/adoptionRequest.route");
const profile_route_1 = require("../modules/Profile/profile.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/",
        route: user_route_1.UserRoutes
    },
    {
        path: "/login",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/pets",
        route: pet_route_1.PetRoutes
    },
    {
        path: "/adoption-requests",
        route: adoptionRequest_route_1.AdoptionRequestRoutes
    },
    {
        path: "/profile",
        route: profile_route_1.ProfileRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
