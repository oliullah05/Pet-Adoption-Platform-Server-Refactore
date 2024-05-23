import express from "express";
import validateRequest from "../../middlewars/validateRequest";
import { ProfileControllers } from "./profile.controller";
import auth from "../../middlewars/auth";
import { ProfileValidations } from "./profile.validation";


const router = express.Router();


router.get("/",auth(), ProfileControllers.getMe);

router.put("/",auth(), 
validateRequest(ProfileValidations.updateMe), 
ProfileControllers.updateMe);

router.post("/change-role/:id",auth("admin"), validateRequest(ProfileValidations.changeUserRole) ,ProfileControllers.changeUserRole);



export const ProfileRoutes = router;