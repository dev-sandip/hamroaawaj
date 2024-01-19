import { useEffect, useState } from "react";
import { ComboboxDemo } from "../report/combo-box";
import { report } from "process";
import { ReportType } from "@/validators/report-validators";

const labels = [
  {
    label: "Label 1",
    value: "label1",
  },
  {
    label: "Label 2",
    value: "label2",
  },
];

const IndividualReportPage = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([] as string[]);
  const [report, setReport] = useState({} as ReportType);

  useEffect(() => {
    const getReport = async () => {};
    getReport();
  }, []);

  useEffect(() => {
    setTags((prev) => [...prev, tag]);
  }, [tag]);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center gap-4">
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
            alt="blog photo"
            src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
            className="w-full object-contain h-max"
          />
          <div className="bg-white w-full p-4">
            <h1 className="text-green-600 text-2xl font-medium">
              Should You Get Online Education?
            </h1>
            <p className="text-gray-600 font-light text-md">
              It is difficult to believe that we have become so used to having
              instant access to information at...
            </p>
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
              {
                <span className="m-1 px-2 py-1 rounded bg-green-500">
                  {" "}
                  #online{" "}
                </span>
              }
            </div>
          </div>
        </div>
        <div>
          <h3>Add labels here</h3>
          <ComboboxDemo
            arrValues={labels}
            location={tag}
            setLocation={setTag}
          />
        </div>
      </div>
    </>
  );
};
export default IndividualReportPage;
