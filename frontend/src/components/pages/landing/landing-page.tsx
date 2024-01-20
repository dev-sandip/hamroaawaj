import { useEffect, useState } from "react";
import PostCard from "../card/post-card";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Combobox } from "../report/combo-box";
import districts from "@/assets/constants/district.json";
import toast from "react-hot-toast";
import Contributors from "./contributors";
import labels from "@/assets/constants/labels.json";

const LandingPage = () => {
  const [district, setDistrict] = useState("");
  const [label, setLabel] = useState("");
  const [posts, setPosts] = useState([] as ReportType[]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await ReportHandler.getAllReports();
      if (res.success) setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleUpdateFilter = async () => {
    const res = await ReportHandler.getFilteredReports(district, label);
    if (!res.success) return toast.error("Something went wrong");
    setPosts(res.data);
  };

  return (
    <div className="w-full h-full mt-14 mx-8 lg:mx-20 flex justify-evenly items-center gap-12">
      <div className="flex flex-col gap-6 items-center justify-center ">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard Preport={post} />)
        ) : (
          <div className="text-2xl font-bold text-center text-gray-700 p-6">
            No Reports Found
          </div>
        )}
      </div>
      <Contributors />

      <Dialog>
        {/* //todo not working propperly */}
        <DialogTrigger>
          <Button variant="outline" className="fixed right-4 top-24 ">
            <FilterIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-3 ic justify-center">
          <h1 className="text-2xl font-bold text-center text-gray-700 p-6">
            Apply Filters
          </h1>
          <Combobox
            placeholder="district"
            arrValues={districts.map((district) => ({
              label: district,
              value: district.toLowerCase(),
            }))}
            location={district}
            setLocation={setDistrict}
          />
          <Combobox
            placeholder="label"
            arrValues={labels.map((v) => ({
              label: v,
              value: v.toLowerCase(),
            }))}
            location={label}
            setLocation={setLabel}
          />
          <Button
            variant="secondary"
            className="w-1/2 mx-auto"
            onClick={handleUpdateFilter}
          >
            Apply
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandingPage;
