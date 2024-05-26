import express from "express"

import { AdoptionRequestControllers } from "./adoptionRequest.controller"
import auth from "../../middlewars/auth";
import validateRequest from "../../middlewars/validateRequest";
import { AdoptionRequestValidations } from "./adoptionRequest.validate";

const router = express.Router()

router.post("/",
auth(),
validateRequest(AdoptionRequestValidations.createAdoptionRequest),
AdoptionRequestControllers.createAdoptionRequest
)


router.get("/",
auth("admin"),
AdoptionRequestControllers.getAllAdoptionRequests
)


router.put("/:id",
auth("admin"),
validateRequest(AdoptionRequestValidations.updateAdoptionRequest),
AdoptionRequestControllers.updateAdoptionRequests
)

router.get("/my",
auth(),
AdoptionRequestControllers.myAdoptionRequest
)
router.get("/my-adopted-pets",
auth(),
AdoptionRequestControllers.myAdoptedPets
)

export const AdoptionRequestRoutes = router;