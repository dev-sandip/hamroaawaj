import { Request, Response } from "express";
import Report from "../models/Report.model";
import ResponseController from "./ResponseController";
import CommentModel from "../models/Comment.model";
import UserModel from "../models/User.model";
import ReportModel from "../models/Report.model";


class ReportController {
    public static ReportPost = async (req: Request, res: Response) => {
        try {
            const { userId, title, location, tag, text, files, labels } = req.body;
            console.log(req.body);
            const newReport = new Report({
                userId,
                title,
                location,
                tag,
                text,
                files,
                labels
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




    public static Comment = async (req: Request, res: Response) => {
        try {
            const { userId, reportId, commentText } = req.body;

            if (!reportId || !userId) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "reportId and userId are required for commenting.",
                    errors: [],
                });
            }

            if (!commentText) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "Comment cannot be null!",
                    errors: [],
                });
            }

            const report = await ReportModel.findById(reportId);

            if (!report) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "Post/Report not found!",
                    errors: [],
                });
            }



            const newComment = new CommentModel({
                userId,
                reportId,
                comment: commentText,
            });

            // Save the new comment to the database
            await newComment.save();

            return ResponseController.HandleSuccessResponse(res, {
                status: 201,
                message: "Comment added successfully!",
                data: newComment,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };

    public static getReportById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "id is required for fetching the report.",
                    errors: [],
                });
            }

            const report = await ReportModel.findById(id);

            if (!report) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "Report not found.",
                    errors: [],
                });
            }

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Report fetched successfully!",
                data: report,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    }
    public static fetchComments = async (req: Request, res: Response) => {
        try {
            const { reportId } = req.params;

            if (!reportId) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "Report ID required for fetching comments!",
                    errors: [],
                });
            }


            const comments = await CommentModel.find({ reportId });

            if (!comments || comments.length === 0) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "Comments not found!",
                    errors: [],
                });
            }

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Comments fetched successfully!",
                data: comments,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };


    public static vote = async (req: Request, res: Response) => {
        try {
            const { userId, reportId, voteType } = req.body;
            console.log("🚀 ~ ReportController ~ vote= ~ userId, reportId, voteType:", userId, reportId, voteType)

            if (!userId || !reportId || !voteType) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "Report ID, userId, and voteType are required for voting.",
                    errors: [],
                });
            }

            const validUser = await UserModel.findById(userId);
            const validReport = await ReportModel.findById(reportId);

            if (!validUser || !validReport) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "User or Report not found!",
                    errors: [],
                });
            }

            validReport.upvote = validReport.upvote.filter(upvoterId => upvoterId !== userId);

            validReport.downvote = validReport.downvote.filter(downvoterId => downvoterId !== userId);

            if (voteType === "upvote") {
                validReport.upvote.push(userId);
            } else if (voteType === "downvote") {
                validReport.downvote.push(userId);
            } else {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "Invalid voteType. Use 'upvote' or 'downvote'.",
                    errors: [],
                });
            }

            await validReport.save();

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: `${voteType} successful!`,
                data: validReport,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };


    public static searchByFilter = async (req: Request, res: Response) => {
        try {
            const { district, label } = req.query;
            console.log("🚀 ~ ReportController ~ searchByFilter= ~ district, label:", district, label);

            if (!district && !label) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "District and label are required for searching.",
                    errors: [],
                });
            }

            const query = {};

            if (district) {
                query['location'] = district;
            }

            if (label) {
                query['labels'] = label;
            }

            const searchResults = await ReportModel.find(query);
            console.log("🚀 ~ ReportController ~ searchByFilter= ~ searchResults:", searchResults);

            if (searchResults.length === 0) {
                return ResponseController.HandleSuccessResponse(res, {
                    status: 200,
                    message: "No matching reports found.",
                    data: [],
                });
            }

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Search results fetched successfully!",
                data: searchResults,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };



    public static notCompletedReports = async (req: Request, res: Response) => {
        try {
            const notCompletedReports = await ReportModel.find({ isCompleted: false });

            if (notCompletedReports.length === 0) {
                return ResponseController.HandleSuccessResponse(res, {
                    status: 200,
                    message: "No incomplete reports found.",
                    data: [],
                });
            }

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "Incomplete reports where isCompleted is false.",
                data: notCompletedReports,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };



    public static getUserPersonalReports = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return ResponseController.HandleResponseError(res, {
                    status: 400,
                    message: "UserId is required for fetching user reports!",
                    errors: [],
                });
            }

            const userReports = await ReportModel.find({ userId });

            if (!userReports || userReports.length === 0) {
                return ResponseController.HandleResponseError(res, {
                    status: 404,
                    message: "No reports found associated with this userId",
                    errors: [],
                });
            }

            return ResponseController.HandleSuccessResponse(res, {
                status: 200,
                message: "User Reports Fetched Successfully",
                data: userReports,
            });
        } catch (error) {
            return ResponseController.Handle500Error(res, error);
        }
    };



    public static rankUsers = async (req: Request, res: Response) => {
        try {
            // Fetch users
            const users = await UserModel.find();

            // Fetch reports
            const reports = await Report.find();

            // Create a map to store upvote counts
            const upvoteCounts: Map<string, number> = new Map();

            // Count upvotes
            reports.forEach((report) => {
                report.upvote.forEach((upvote) => {
                    const userIdString = upvote.toString();
                    upvoteCounts.set(userIdString, (upvoteCounts.get(userIdString) || 0) + 1);
                });
            });

            // Sort users based on upvote counts
            const rankedUsers = users.sort((a, b) => {
                const upvoteDiff = (upvoteCounts.get(b._id.toString()) || 0) - (upvoteCounts.get(a._id.toString()) || 0);
                return upvoteDiff !== 0 ? upvoteDiff : a._id.toString().localeCompare(b._id.toString());
            }).slice(0, 5);

            console.log('Upvote Counts:', Array.from(upvoteCounts.entries()));
            console.log('Sorted Users:', rankedUsers.map(user => ({ _id: user._id, upvoteCount: upvoteCounts.get(user._id.toString()) || 0 })));

            return res.status(200).json({
                status: 200,
                message: "Users ranked successfully",
                data: rankedUsers,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                errors: [error.message || "An error occurred"],
            });
        }
    };



}



export default ReportController;
