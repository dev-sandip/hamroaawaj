import { ReportType } from "@/validators/report-validators";
import { Link } from "react-router-dom";

const ReportComp = ({ report }: { report: ReportType }) => {
  return (
    <Link
      to={`/dashboard/reports/${report._id}`}
      className="
            overflow-hidden
            shadow-lg
            transition
            duration-500
            ease-in-out
            transform
            hover:shadow-2xl
            rounded-lg
            md:w-80
          "
    >
      <img
        alt=""
        src={report.files[0]}
        className="max-h-40 w-full object-cover"
      />
      <div className="bg-white w-full p-4">
        <Link
          to={`/dashboard/reports/${report._id}`}
          className="text-foreground text-2xl font-medium"
        >
          {report.title}
        </Link>
        <p className="text-gray-600 font-light text-md">
          {report.text.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
};
export default ReportComp;
