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
    <>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard report={post} />
        ))}
      </div>
    </>
  );
};

export default LandingPage;
