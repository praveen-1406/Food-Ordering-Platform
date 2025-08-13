import express, { RequestHandler } from "express";
import MyUserController from "../controllers/MyUserController"
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyUserRequest } from "../middlewares/validation";
const router=express.Router();

// /api/my/user

router.get(
    "/",
    jwtCheck,
    jwtParse,
    MyUserController.getCurrentUser as RequestHandler
);

router.post(
    "/",
    jwtCheck,
    MyUserController.createCurrentUser as RequestHandler
);

router.put(
    "/",
    jwtCheck, 
    jwtParse, 
    validateMyUserRequest, 
    MyUserController.updateCurrentUser as RequestHandler
);



export default router; 