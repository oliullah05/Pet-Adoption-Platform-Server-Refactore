import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewars/validateRequest";
import { AuthValidations } from "./auth.validation";
import auth from "../../middlewars/auth";




const router = express.Router();


router.post("/",validateRequest(AuthValidations.loginUser), AuthControllers.loginUser);

router.post("/change-password",
auth(),
validateRequest(AuthValidations.changePassword
), 
AuthControllers.changePassword);




export const AuthRoutes = router;