import AuthHandler from "@/handlers/auth-handler";
import { UserType } from "@/types/user.types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserComp from "./user-comp";
import { motion } from "framer-motion";
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
    <div className="grid grid-cols-2 gap-4 items-center">
      {users.length > 0 ? (
        users.map((user, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <UserComp key={index} user={user} />;
            </motion.div>
          );
        })
      ) : (
        <div className=" text-center text-gray-500 dark:text-gray-400 m-auto col-span-3">
          No users found
        </div>
      )}
    </div>
  );
};
export default UserAdminPage;
