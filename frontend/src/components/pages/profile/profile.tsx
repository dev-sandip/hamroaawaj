import { useGlobalContext } from "@/hooks/use-global-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";
import PostCard from "../card/post-card";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [userPosts, setUserPosts] = useState([] as ReportType[]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
      console.log("user not logged in");
    }
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const res = await ReportHandler.getMyReports(user?._id as string);
      if (res.success) {
        setUserPosts(res.data);
      }
    };
    fetchMyPosts();
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-6">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="" src={user?.profileImg} />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="grid gap-1 text-center">
          <div className="text-2xl font-bold">{user?.name}</div>
          <div className="text-lg text-gray-500 dark:text-gray-400">
            {user?.email}
          </div>
        </div>
        <img
          alt="User Image"
          className="w-full max-w-2xl overflow-hidden rounded-lg object-contain object-center"
          height="400"
          src={user?.legaldocImg}
          width="600"
        />

        {userPosts.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold">Your Reports</h3>
            {userPosts.map((report, index) => {
              return <PostCard Preport={report} key={index} />;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
