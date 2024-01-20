import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import ReportHandler from "@/handlers/report-handler";
import { UserType } from "@/types/user.types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const Contributors = () => {
  const [topContributors, setTopContributors] = useState([] as UserType[]);

  useEffect(() => {
    const getContributors = async () => {
      const res = await ReportHandler.getRankUsers();
      if (res.success) {
        setTopContributors(res.data);
      }
    };
    getContributors();
  }, []);

  return (
    <>
      <div className="flex-col gap-4 p-4 hidden lg:flex lg:w-56 xl:w-96 self-start">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-gray-700"
        >
          Top Contributors
        </motion.h1>
        {topContributors.map((c, i) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * i }}
              key={c._id}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <Avatar>
                <AvatarImage alt="" src={c.profileImg} />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{c.name}</h3>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Contributors;
