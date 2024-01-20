import mongoose from "mongoose";
import User from "./User.model";

/**
 * Represents the schema for a report in the application.
 * @remarks This schema contains the data of the report
 */
const ReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    title: {
        type: String,
        required: true,
        min: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    tag: [String],
    text: {
        type: String,
    },
    files: [String],
    labels: [String],
    upvote: [String],
    downvote: [String],

});

export default mongoose.model("Report", ReportSchema);
