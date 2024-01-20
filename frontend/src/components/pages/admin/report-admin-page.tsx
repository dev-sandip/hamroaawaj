import { useEffect, useState } from "react";
import ReportComp from "./report-comp";
import { ReportType } from "@/validators/report-validators";
import ReportHandler from "@/handlers/report-handler";
import { motion } from "framer-motion";
const ReportAdminPage = () => {
  const [reports, setReports] = useState([] as ReportType[]);
  useEffect(() => {
    const getReports = async () => {
      const res = await ReportHandler.getUnlabelledReports();
      if (res.success) {
        setReports(res.data);
      }
    };
    getReports();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {reports.length > 0 ? (
        reports.map((report: ReportType, i) => (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 * i }}
            >
              <ReportComp report={report} key={report._id} />
            </motion.div>
          </>
        ))
      ) : (
        <div className="col-span-3 text-center text-2xl">No Reports</div>
      )}
    </div>
  );
};
export default ReportAdminPage;
