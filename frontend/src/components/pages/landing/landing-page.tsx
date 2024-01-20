import { useEffect, useState } from "react";
import PostCard from "../card/post-card";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";

const LandingPage = () => {
  const [posts, setPosts] = useState([] as ReportType[]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await ReportHandler.getAllReports();
      if (res.success) setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-full mx-auto mt-6">
      <div className="flex flex-col gap-6 mx-auto items-center justify-center ">
        {posts.map((post) => (
          <PostCard report={post} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
