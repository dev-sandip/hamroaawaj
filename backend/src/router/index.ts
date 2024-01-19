import { Router } from "express";
import homeRouter from "./home.route";
import authRouter from "./auth.route";
import ReportRouter from "./report.route";

const appRouter = Router();

appRouter.use("/home", homeRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/report", ReportRouter)

export default appRouter;