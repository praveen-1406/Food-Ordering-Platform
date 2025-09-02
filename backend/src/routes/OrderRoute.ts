import express, { RequestHandler } from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.get(
    "/",
    jwtCheck,
    jwtParse,
    OrderController.getMyOrders
)

router.post(
    "/checkout/create-checkout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession as RequestHandler
);


// Stripe Webhook:
router.post(
    "/checkout/webhook",
    OrderController.stripeWebhookHandler as RequestHandler
)

export default router;