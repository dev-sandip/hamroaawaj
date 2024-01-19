import { Router } from "express";
import ReportPostController from "../controllers/ReportController";

const ReportRouter = Router();

ReportRouter.post(
    "/post",
    ReportPostController.ReportPost
);


export default ReportRouter;