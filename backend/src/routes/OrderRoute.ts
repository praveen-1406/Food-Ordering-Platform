import express, { RequestHandler } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
    "/checkout/create-chekout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession as RequestHandler
);