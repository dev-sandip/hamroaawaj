import AuthHandler from "@/handlers/auth-handler";
import { UserType } from "@/types/user.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserComp from "./user-comp";

const UserAdminPage = () => {
  const [users, setUsers] = useState([] as Partial<UserType>[]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await AuthHandler.getUnverifiedUsers();
      if (res.success) {
        setUsers(res.data as Partial<UserType>[]);
      } else {
        toast.error("Users not found");
      }
    };
    getUsers();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {users.map((user, index) => {
        return <UserComp key={index} user={user} />;
      })}
    </div>
  );
};
export default UserAdminPage;
