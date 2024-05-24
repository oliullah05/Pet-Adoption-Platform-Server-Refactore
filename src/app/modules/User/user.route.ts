import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewars/validateRequest";
import { UserValidations } from "./user.validation";
import auth from "../../middlewars/auth";


const router = express.Router();


router.get("/user",auth("admin"), UserControllers.getAllUser);
router.post("/register",validateRequest(UserValidations.createUser), UserControllers.createUser);



export const UserRoutes = router;


