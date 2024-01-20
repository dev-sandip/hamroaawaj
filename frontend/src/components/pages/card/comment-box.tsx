import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaRegComment } from "react-icons/fa";
import { UserType } from "@/types/user.types";
import { ReportType } from "@/validators/report-validators";
import { useGlobalContext } from "@/hooks/use-global-context";
import ReportHandler from "@/handlers/report-handler";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CommentType } from "@/types/report.types";
import AuthHandler from "@/handlers/auth-handler";

const CommentBox = ({ report }: { report: ReportType }) => {
  const { user } = useGlobalContext();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([] as CommentType[]);

  useEffect(() => {
    const fetchComments = async () => {
      // const res = await ReportHandler.getComments(report._id); todo
      // if (res.success) setComments(res.data);
    };
    fetchComments();
  }, [report._id]);

  const handleSubmitComment = async (e: any) => {
    e.preventDefault();
    const res = await ReportHandler.addComment(
      report._id,
      user?._id as string,
      commentText
    );
    if (!res.success) {
      toast.error("Something went wrong");
      return;
    }
    setCommentText("");
    setComments((prev) => [...prev, res.data]);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          title="Add a comment"
          className="flex items-center justify-center p-2"
        >
          <FaRegComment className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="w-full max-w-2xl mx-auto h-[calc(100%-40px)]">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="flex flex-col gap-3 h-full">
            <div className="flex flex-col gap-3 flex-grow">
              {comments.length === 0 ? (
                <p className="text-center text-gray-500">
                  No comments yet. Be the first to comment.
                </p>
              ) : (
                comments.map((comment) => (
                  <AComment key={comment.createdAt} comment={comment} />
                ))
              )}
            </div>
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-2">Add a comment</h3>
              <form className="space-y-2">
                <Textarea
                  id="comment"
                  placeholder="Type your comment here."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  onClick={handleSubmitComment}
                  role="button"
                  className="w-full"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CommentBox;

const AComment = ({ comment }: { comment: CommentType }) => {
  const [user, setUser] = useState({} as UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await AuthHandler.getUserById(comment.userId);
      if (res.success) setUser(res.data);
    };
    fetchUser();
  }, [comment.userId]);

  if (!user) return null;

  return (
    <div className="flex items-start space-x-4">
      <Avatar className="w-10 h-10">
        <AvatarImage alt="" src={user?.profileImg} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold">{user.name}</span>
          <span className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};
