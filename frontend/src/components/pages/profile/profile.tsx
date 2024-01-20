import { useGlobalContext } from "@/hooks/use-global-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";
import PostCard from "../card/post-card";
import toast from "react-hot-toast";
import AuthHandler from "@/handlers/auth-handler";
import { CameraIcon } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useGlobalContext();
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

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        // Check the file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file.");
          return;
        }

        // Check the file size
        const fileSizeInMB = file.size / (1024 * 1024);
        const maxSizeInMB = 5;
        if (fileSizeInMB > maxSizeInMB) {
          toast.error(`Please upload an image smaller than ${maxSizeInMB} MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          const res = await AuthHandler.updateAvatar(
            base64Data,
            user?._id as string,
          );
          if (res.success) {
            toast.success("Profile image updated successfully");
            setUser(res.data);
          } else {
            toast.error("Error updating profile image");
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-6">
        <Avatar
          className="h-24 w-24 relative group cursor-pointer"
          onClick={handleImageUpload}
        >
          <AvatarImage alt="" src={user?.profileImg} />
          <AvatarFallback>JP</AvatarFallback>
          <div className="absolute w-[200%] h-[200%] bg-muted opacity-0 group-hover:opacity-60 transition-opacity duration-300 "></div>
          <CameraIcon className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6  rounded-full text-primary-500 opacity-0 group-hover:opacity-100" />
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
