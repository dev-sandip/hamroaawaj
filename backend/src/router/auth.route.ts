import { Router } from "express";
import UserAuthController from "../controllers/authController";
const authRouter = Router();
//Create a new email user.
authRouter.post(
    "/register",
    UserAuthController.Register
);
authRouter.post("/login", UserAuthController.Login);

export default authRouter;