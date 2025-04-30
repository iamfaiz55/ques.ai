import express from "express";
import * as authController from "../controllers/auth.controller";


const authRoutes = express.Router();

authRoutes
    .post("/register", authController.register)
    .post("/login", authController.login)
    .post("/sign-out", authController.signOut)
  

export default authRoutes;
