import express, { RequestHandler } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post(
    "/checkout/create-checkout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession as RequestHandler
);

router.post(
    "/checkout/webhook",
    OrderController.stripeWebhookHandler as RequestHandler
)

export default router;