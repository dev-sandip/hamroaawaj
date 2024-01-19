import { Request, Response } from "express";
import Report from "../models/Report.model";
import ResponseController from "./ResponseController";


class ReportPostController {
    public static ReportPost = async (req: Request, res: Response) => {
        try {
            const { userId, title, location, tag, content, labels } = req.body;

            const newReport = new Report({
                userId,
                title,
                location,
                tag,
                content,
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
}

export default ReportPostController;
