import { useEffect, useRef, useState } from "react";
import { Combobox } from "../report/combo-box";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import labels from "@/assets/constants/labels.json";

const IndividualReportPage = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([] as string[]);
  const [report, setReport] = useState({} as ReportType);
  const { reportId } = useParams();
  useEffect(() => {
    const getReport = async () => {
      const res = await ReportHandler.getReportById(reportId || "");
      if (res.success) {
        setReport(res.data);
      } else {
        toast.error("No report found");
      }
    };
    getReport();
  }, []);

  useEffect(() => {
    if (!tag) return;
    if (tags.includes(tag)) return;
    setTags((prev) => [...prev, tag]);
  }, [tag]);

  const handleUpdateLabel = async () => {
    const res = await ReportHandler.updateReportLabel(reportId || "", tags);
    if (res.success) {
      toast.success("Report updated");
    } else {
      toast.error("Error updating report");
    }
  };

  const requestFullScreen = () => {
    if (!imgRef.current) return;
    if (imgRef.current.requestFullscreen) {
      imgRef.current.requestFullscreen();
    }
  };

  return (
    <>
      <div className="w-full mt-12 h-full flex items-center justify-center gap-12">
        <div
          className="
    overflow-hidden
    shadow-lg
    transition
    duration-500
    ease-in-out
    transform
    hover:shadow-2xl
    rounded-lg
    md:w-[600px]
  "
        >
          <img
            ref={imgRef}
            onClick={requestFullScreen}
            alt="blog photo"
            src={report.files ? report.files[0] : ""}
            className="w-full object-contain h-max max-h-96 cursor-pointer"
          />
          <div className="bg-white w-full p-4">
            <h1 className="text-foreground text-2xl font-medium">
              {report.title}
            </h1>
            <p className="text-gray-600 font-light text-md">{report.text}</p>
            <div
              className="
        flex flex-wrap
        justify-starts
        items-center
        py-3
        border-b-2
        text-xs text-white
        font-medium
      "
            >
              {tags.map((tag) => (
                <span className="m-1 px-2 py-1 rounded bg-green-500">
                  {" "}
                  #{tag && tag}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="">Add labels here</h3>
          <Combobox
            placeholder="labels"
            arrValues={labels.map((v) => ({
              label: v,
              value: v.toLowerCase(),
            }))}
            location={tag}
            setLocation={setTag}
          />
          {labels && (
            <div className="flex flex-col gap-4">
              <Button variant="outline" onClick={() => setTags([])}>
                Discard
              </Button>
              <Button onClick={handleUpdateLabel}>Update</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default IndividualReportPage;
