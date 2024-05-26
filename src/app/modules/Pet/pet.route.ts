import express, { NextFunction, Request, Response } from "express";
import { PetValidations } from "./pet.validation";
import { PetControllers } from "./pet.controller";
import validateRequest from "../../middlewars/validateRequest";
import auth from "../../middlewars/auth";
import { upload } from "../../helpers/fileUploader";

const router = express.Router();


router.post("/",
auth("admin"),
upload.single('file'),
(req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    console.log({file:req.file,body:req.body});
    next();
},
validateRequest(PetValidations.createPet),
PetControllers.createPet);

router.post("/upload-multiple-photos",
auth("admin"),
upload.array("files"),
PetControllers.uploadMultiplePhotos

)
router.get("/unique-breeds", PetControllers.getUniqueBreeds);
router.get("/unique-ages", PetControllers.getUniqueAges);
router.get("/unique-locations", PetControllers.getUniqueLocations);

router.get("/", PetControllers.getAllPets);
router.get("/:id",auth(), PetControllers.getSinglePet);

router.put("/:id",auth("admin"),validateRequest(PetValidations.updatePet), PetControllers.updateSinglePet);

router.delete("/:id",auth("admin"), PetControllers.deleteSinglePet);




export const PetRoutes = router;