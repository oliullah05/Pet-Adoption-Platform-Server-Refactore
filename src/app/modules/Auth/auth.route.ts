import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewars/validateRequest";
import { AuthValidations } from "./auth.validation";




const router = express.Router();


router.post("/",validateRequest(AuthValidations.loginUser), AuthControllers.loginUser);




export const AuthRoutes = router;