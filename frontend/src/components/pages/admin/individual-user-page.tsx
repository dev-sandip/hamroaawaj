import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AuthHandler from "@/handlers/auth-handler";
import { UserType } from "@/types/user.types";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const IndividualUserPage = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const getUser = async () => {
      const res = await AuthHandler.getUserById(userId as string);
      if (res.success) {
        setUser(res.data as UserType);
      } else {
        toast.error("User not found");
      }
    };
    getUser();
  }, []);
  const requestFullScreen = () => {
    if (!imgRef.current) return;
    if (imgRef.current.requestFullscreen) {
      imgRef.current.requestFullscreen();
    }
  };

  const handleVerify = async () => {
    const res = await AuthHandler.verifyUserByDoc(userId as string);
    if (res.success) {
      toast.success("User verified");
      navigate("/dashboard");
    } else {
      toast.error("User not verified");
    }
  };

  return (
    <div className="max-w-2xl m-auto mt-6 flex flex-col gap-6 items-center justify-center">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage alt="User's name" src={user?.profileImg} />
            <AvatarFallback>
              {user?.name?.split(" ").map((name) => name[0])}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-xs text-center">
            <div className="font-medium text-lg">{user?.name}</div>
            <div className="text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <img
            ref={imgRef}
            alt="User's Image"
            className="w-full rounded-lg cursor-pointer"
            height="600"
            src={user?.legaldocImg}
            style={{
              aspectRatio: "400/200",
              objectFit: "contain",
            }}
            onClick={requestFullScreen}
          />
        </CardContent>
      </Card>
      <div className="flex gap-6">
        <Link to="/dashboard">
          <Button variant="secondary" className="px-8">
            Back
          </Button>
        </Link>
        <Button onClick={handleVerify} className="px-8">
          Verify
        </Button>
      </div>
    </div>
  );
};
export default IndividualUserPage;
