import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user.types";
import { ReportType } from "@/validators/report-validators";
import { useEffect, useRef, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatThin } from "react-icons/pi";
import { BiDownvote } from "react-icons/bi";
import AuthHandler from "@/handlers/auth-handler";
import { Badge } from "@/components/ui/badge";
import { IoCheckmarkDone } from "react-icons/io5";
import ReportHandler from "@/handlers/report-handler";
import toast from "react-hot-toast";
import CommentBox from "./comment-box";
import { cn } from "@/lib/utils";

const PostCard = ({ Preport }: { Preport: ReportType }) => {
  const [user, setuser] = useState({} as UserType);
  const [report, setReport] = useState(Preport as ReportType);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await AuthHandler.getUserById(report.userId);
      if (res.success) setuser(res.data);
    };
    fetchUser();
  }, [report.userId]);

  const requestFullScreen = () => {
    if (!imgRef.current) return;
    if (imgRef.current.requestFullscreen) {
      imgRef.current.requestFullscreen();
    }
  };

  const markAsCompleted = async () => {
    const res = await ReportHandler.markAsComplete(report._id);
    if (res.success) {
      toast.success("Marked as completed");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      toast.error("Your browser does not support this feature");
      return;
    }
    try {
      await navigator.share({
        title: "Report",
        text: report.text,
        url: window.location.href,
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleUpVote = async (type: "upvote" | "downvote") => {
    const res = await ReportHandler.handleVote(report._id, user._id, type);
    if (res.success) return setReport(res.data);
    toast.error("Something went wrong");
  };

  return (
    <>
      <div className="rounded-md shadow-md sm:w-[500px] bg-coolGray-900 text-coolGray-100">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <img
              src={user.profileImg}
              alt=""
              className="object-cover object-center w-10 h-10 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold leading-none">
                {user.name}
                <span className="font-medium opacity-70">
                  {" "}
                  from{" "}
                  {report.location[0].toUpperCase() + report.location.slice(1)}
                </span>
              </h2>
              <span className="flex gap-2">
                {report.isCompleted ? (
                  <Badge variant="destructive">Completed</Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )}
                {report.labels.length > 0 &&
                  report.labels.map((label) => (
                    <Badge variant="outline">{label}</Badge>
                  ))}
              </span>
            </div>
          </div>
          {(user.isAdmin || user.isMod) && !report.isCompleted && (
            <Button
              onClick={markAsCompleted}
              title="Mark as completed"
              variant="ghost"
            >
              <IoCheckmarkDone className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className=" text-xs leading-none text-coolGray-400 p-3 flex flex-col gap-3">
          <h1 className="text-lg leading-none">{report.title}</h1>

          <p className="text-sm leading-none text-muted-foreground">
            {report.text}
          </p>
          <span className="flex gap-2">
            {report.tag.map((t) => (
              <Badge variant="outline">#{t}</Badge>
            ))}
          </span>
        </div>
        <img
          ref={imgRef}
          onClick={requestFullScreen}
          src={report.files[0]}
          alt=""
          className="object-contain object-center w-full h-72 bg-coolGray-500 cursor-pointer"
        />
        <div className="p-3 opacity-70">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={() => handleUpVote("upvote")}
                variant="ghost"
                type="button"
                title="Like post"
                className={cn(
                  "flex items-center justify-center gap-2 p-2",
                  report.upvote.includes(user._id)
                    ? "text-red-500"
                    : "text-coolGray-400"
                )}
              >
                <BiUpvote className="w-5 h-5" />
                <span className="text-lg">{1}</span>
              </Button>
              <Button
                onClick={() => handleUpVote("downvote")}
                variant="ghost"
                title="Add a comment"
                className={cn(
                  "flex items-center justify-center p-2",
                  report.downvote.includes(user._id)
                    ? "text-red-500"
                    : "text-coolGray-400"
                )}
              >
                <BiDownvote className="w-5 h-5" />
              </Button>
              <CommentBox report={report} />
            </div>
            <Button
              onClick={handleShare}
              variant="ghost"
              title="Bookmark post"
              className="flex items-center justify-center p-2"
            >
              <PiShareFatThin className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
