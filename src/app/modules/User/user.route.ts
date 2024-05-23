import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewars/validateRequest";
import { UserValidations } from "./user.validation";
import auth from "../../middlewars/auth";


const router = express.Router();


router.get("/user",UserControllers.getAllUser);
router.post("/register",validateRequest(UserValidations.createUser), UserControllers.createUser);
router.get("/profile", auth(), UserControllers.getMe);
router.post("/profile", auth(), UserControllers.updateMe);



export const UserRoutes = router;


