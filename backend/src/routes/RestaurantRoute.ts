import express, { RequestHandler } from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router=express.Router();

// api/restaurant/search/jhansi
router.get(
    "/search/:city",
    param("city")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("City must be a valid string"),
    RestaurantController.searchRestaurants as RequestHandler
)

export default router;
