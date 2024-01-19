import { Router } from "express";
import UserAuthController from "../controllers/authController";
import { verifyToken } from "../utils/token-manager";
const authRouter = Router();
//Create a new email user.
authRouter.post(
    "/register",
    UserAuthController.Register
);
authRouter.post("/login", UserAuthController.Login);
authRouter.get("/verify", verifyToken, UserAuthController.verifyUser);
authRouter.post("/logout", UserAuthController.logout)
authRouter.put("/verfiyUserByDoc", UserAuthController.VerifyUserByValidDoc)

export default authRouter;