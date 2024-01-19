import { Request, Response } from "express";
import Report from "../models/Report.model";
import ResponseController from "./ResponseController";


class ReportController {
    public static ReportPost = async (req: Request, res: Response) => {
        try {
            const { userId, title, location, tag, text, files, labels } = req.body;

            const newReport = new Report({
                userId,
                title,
                location,
                tag,
                text,
                files,
                labels,
            });

            await newReport.save();

            return ResponseController.HandleSuccessResponse(res, {
                status: 201,
                message: "Report created successfully!",
                data: newReport,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };
    public static FetchReports = async (req: Request, res: Response) => {
        try {

            const reports = await Report.find();
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Reports fetched successfully!",
                data: reports,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };
}



export default ReportController;
