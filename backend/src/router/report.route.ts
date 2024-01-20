import { Router } from "express";
import ReportController from "../controllers/ReportController";

const ReportRouter = Router();

<<<<<<< HEAD
ReportRouter.post(
    "/post",
    ReportController.ReportPost
);
ReportRouter.get("/fetchAll", ReportController.FetchReports)
=======
ReportRouter.post("/post", ReportController.ReportPost);
ReportRouter.get("/fetchAll", ReportController.FetchReports);
ReportRouter.get(
  "/fetchwithoutlabel",
  ReportController.FetchReportWithoutLabel
);
ReportRouter.put("/updateLabel", ReportController.UpdateLabel);
ReportRouter.put("/compeleteReport", ReportController.isCompleted);
ReportRouter.post("/comment", ReportController.Comment);
ReportRouter.get("/id/:id", ReportController.getReportById);
>>>>>>> main

export default ReportRouter;
