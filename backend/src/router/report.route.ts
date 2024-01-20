import { Router } from "express";
import ReportController from "../controllers/ReportController";

const ReportRouter = Router();

ReportRouter.post("/post", ReportController.ReportPost);
ReportRouter.get("/fetchAll", ReportController.FetchReports);
ReportRouter.get("/fetchwithoutlabel", ReportController.FetchReportWithoutLabel);
ReportRouter.put("/updateLabel", ReportController.UpdateLabel);
ReportRouter.put("/compeleteReport", ReportController.isCompleted);
ReportRouter.post("/comment", ReportController.Comment);
ReportRouter.get("/id/:id", ReportController.getReportById);
ReportRouter.get("/comments/:reportId", ReportController.fetchComments);
ReportRouter.get("/vote", ReportController.vote);
export default ReportRouter;
