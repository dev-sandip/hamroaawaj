import { Router } from "express";
import { Request, Response } from "express";
const homeRouter = Router();

homeRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        message: "Welcome to the Backend of HamroAwaz!",
        data: {
            github: "git-sandip",
            name: "Sandip Sapkota",
            age: 20,
            role: "Backend Developer",
            exprience: "0 years",
        },
    });
});

export default homeRouter;