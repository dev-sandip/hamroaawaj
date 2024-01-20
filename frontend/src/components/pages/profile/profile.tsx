import { useGlobalContext } from "@/hooks/use-global-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      console.log("user not logged in");
    }
  });

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
        {
          "his posts " //todo
        }
      </div>
    </>
  );
};

export default Profile;
