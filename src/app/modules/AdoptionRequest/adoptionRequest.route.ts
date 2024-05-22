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
auth(),
AdoptionRequestControllers.getAllAdoptionRequests
)

router.put("/:id",
auth(),
validateRequest(AdoptionRequestValidations.updateAdoptionRequest),
AdoptionRequestControllers.updateAdoptionRequests
)

export const AdoptionRequestRoutes = router;