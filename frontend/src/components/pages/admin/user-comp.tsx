import { UserType } from "@/types/user.types";
import { Link } from "react-router-dom";

const UserComp = ({ user }: { user: Partial<UserType> }) => {
  return (
    <Link
      to={user._id || ""}
      className="flex items-center gap-4 p-2 hover:bg-muted rounded-lg"
    >
      <img className="w-10 h-10 rounded-full" src={user.profileImg} alt="" />
      <div className="font-medium text-foreground">
        <div>{user.name}</div>
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </div>
    </Link>
  );
};
export default UserComp;
