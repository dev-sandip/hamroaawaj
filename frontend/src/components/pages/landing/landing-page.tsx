import { useEffect, useState } from "react";
import PostCard from "../card/post-card";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="fixed right-4 top-24 ">
            <FilterIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          hwllo world
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
