import express, { RequestHandler } from "express";
import MyUserController from "../controllers/MyUserController"
import { jwtCheck } from "../middlewares/auth";
const router=express.Router();

// /api/my/user

router.post("/",jwtCheck,MyUserController.createCurrentUser as RequestHandler) 


export default router; 