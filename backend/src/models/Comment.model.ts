import mongoose from "mongoose";
import User from "./User.model";
import Report from "./Report.model";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
    reportId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: Report,
    },
    comment: {
        type: String,
        min: 3,
        max: 50,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model("Comments", CommentSchema);
