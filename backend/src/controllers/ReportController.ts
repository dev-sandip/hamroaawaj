import { Request, Response } from "express";
import Report from "../models/Report.model";
import ResponseController from "./ResponseController";


class ReportController {
    public static ReportPost = async (req: Request, res: Response) => {
        try {
            const { userId, title, location, tag, text, files } = req.body;

            const newReport = new Report({
                userId,
                title,
                location,
                tag,
                text,
                files,
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

            const reports = await Report.find().limit(4);
            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Reports fetched successfully!",
                data: reports,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };
    public static FetchReportWithoutLabel = async (req: Request, res: Response) => {
        try {
            const reports = await Report.find();
            const reportsWithoutLabels = reports.filter(report => report.labels.length === 0);

            if (reportsWithoutLabels.length > 0) {
                return ResponseController.HandleSuccessResponse(res, {
                    status: 200,
                    message: "Reports without labels fetched successfully!",
                    data: reportsWithoutLabels,
                });
            } else {
                return ResponseController.HandleSuccessResponse(res, {
                    status: 404,
                    message: "No reports without labels found!",
                    data: [],
                });
            }
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };



    public static UpdateLabel = async (req: Request, res: Response) => {
        try {
            const { postId, label } = req.body;
            if (!postId) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "postId is required for updating the label.",
                    errors: [],
                });
            }


            const updatedReport = await Report.findByIdAndUpdate(
                postId,
                { $push: { labels: label } },
                { new: true }
            );

            if (!updatedReport) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "Report not found.",
                    errors: [],
                });
            }

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Label updated successfully!",
                data: updatedReport,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };




    public static isCompleted = async (req: Request, res: Response) => {
        try {
            const { reportId } = req.body;

            if (!reportId) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "reportId is required for verification.",
                    errors: [],
                });
            }

            const updatedReport = await Report.findOneAndUpdate(
                { _id: reportId, isCompleted: false },
                { $set: { isCompleted: true, updatedAt: new Date() } },
                { new: true }
            );

            if (updatedReport) {
                return ResponseController.HandleSuccessResponse(res, {
                    status: 200,
                    message: "Report completed  successfully!",
                    data: updatedReport,
                });
            } else {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "Report not found or already completed.",
                    errors: [],
                });
            }
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };
}



export default ReportController;
