import express, { NextFunction, Request, Response } from "express";
import { PetValidations } from "./pet.validation";
import { PetControllers } from "./pet.controller";
import validateRequest from "../../middlewars/validateRequest";
import auth from "../../middlewars/auth";
import { upload } from "../../helpers/fileUploader";

const router = express.Router();


router.post("/",
auth(), 

upload.single('file'),
(req: Request, res: Response, next: NextFunction) => {
  req.body = JSON.parse(req.body.data);
  next();
},
// validateRequest(PetValidations.createPet), 
PetControllers.createPet);



router.get("/",auth(), PetControllers.getAllPets);
router.put("/:id",auth(),validateRequest(PetValidations.updatePet), PetControllers.updateSinglePet);




export const PetRoutes = router;