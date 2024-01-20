import ReportHandler from "@/handlers/report-handler";
import { ReportType } from "@/validators/report-validators";
import { useEffect, useState } from "react";
import PostCard from "../card/post-card";

const CompletReportPage = () => {
  const [inCompleteReports, setInCompleteReports] = useState<ReportType[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await ReportHandler.getNotCompletedReports();
      if (res.success) setInCompleteReports(res.data);
    };
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {inCompleteReports.map((report, index) => {
        return <PostCard Preport={report} key={index} />;
      })}
    </div>
  );
};
export default CompletReportPage;
