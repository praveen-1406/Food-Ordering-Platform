import express, { RequestHandler } from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { jwtCheck, jwtParse } from '../middlewares/auth';
import { validateMyRestaurantRequest } from '../middlewares/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    }
});

// /api/my/restaurant

router.get(
    "/order",
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurantOrders as RequestHandler,
)

router.patch(
    "/order/:orderId/status",
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateOrderStatus as RequestHandler,
)

router.get(
    "/",
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurant as RequestHandler,
);

router.post(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.createMyRestaurant as RequestHandler
);

router.put(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateMyRestaurant as RequestHandler
);

export default router;