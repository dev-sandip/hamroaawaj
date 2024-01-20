import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiUploadCloud } from "react-icons/fi";
import { Combobox } from "./combo-box";
import { useEffect, useState } from "react";
import ReportValidator, { ReportType } from "@/validators/report-validators";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/hooks/use-global-context";
import ReportHandler from "@/handlers/report-handler";
import { useNavigate } from "react-router-dom";
import districts from "@/assets/constants/district.json";

const ReportPage = () => {
  const [reportData, setReportData] = useState({} as ReportType);
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const [tag, setTag] = useState("");
  const handleChange = (e: any) => {
    setReportData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(reportData);
  }, [reportData]);

  useEffect(() => {
    setReportData((prev) => ({
      ...prev,
      tag: tag.split(","),
    }));
  }, [tag]);

  useEffect(() => {
    setReportData((prev) => ({
      ...prev,
      location,
    }));
  }, [location]);

  const handleImageUpload = async () => {
    if (isSubmitting) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        // Check the file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file.");
          return;
        }

        // Check the file size
        const fileSizeInMB = file.size / (1024 * 1024);
        const maxSizeInMB = 5;
        if (fileSizeInMB > maxSizeInMB) {
          toast.error(`Please upload an image smaller than ${maxSizeInMB} MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          setReportData((prev) => ({
            ...prev,
            files: [base64Data],
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    console.log(reportData);
    const data = ReportValidator.validateReport({
      ...reportData,
      userId: user?._id,
    });
    console.log(data);
    if (!data.success) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = await ReportHandler.createReport({
      ...data.data,
      _id: "",
      labels: [],
    });
    if (res.success) {
      toast.success("Report created successfully");
      navigate("/");
      handleReset();
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleReset = () => {
    setReportData((prev) => ({
      ...prev,
      title: "",
      text: "",
      files: [],
      location: "",
      tag: [],
      userId: user?._id || "",
    }));
    setLocation("");
    setTag("");
  };

  if (!user) {
    navigate("/login");
  }

  return (
    <div className="max-w-3xl w-screen h-screen flex flex-col justify-center items-center m-auto gap-6 p-2">
      <div className="flex flex-col gap-3 items-center justify-center rounded-xl h-max">
        <h1 className="text-3xl font-extrabold text-center text-foreground">
          Create a New Report
        </h1>
        <p className="text-center text-muted-foreground">
          Remember to report only the true problems. Do not include your
          opinions or any information that you cannot verify.
        </p>
      </div>
      <form className="flex flex-col gap-3 items-center justify-center w-full">
        <Input
          name="title"
          onChange={(e) => handleChange(e)}
          value={reportData.title}
          placeholder="Title"
        />
        <div className="h-36 w-full flex items-center justify-center border-2 border-muted rounded-lg relative">
          {reportData.files && (
            <img
              src={reportData.files[0]}
              className="w-full h-full object-cover object-center absolute rounded-lg"
            />
          )}
          <button
            type="button"
            role="button"
            onClick={handleImageUpload}
            className="h-24 w-1/2 border-2 border-dashed rounded-lg"
          >
            <FiUploadCloud className="h-12 w-12 m-auto font-light text-muted-foreground opacity-35" />
          </button>
        </div>
        <Textarea
          onChange={(e) => handleChange(e)}
          name="text"
          value={reportData.text}
          placeholder="Describe the problem in detail."
          className="h-40"
        />
        <Combobox
          placeholder="location"
          location={location}
          setLocation={setLocation}
          arrValues={districts.map((district) => ({
            label: district,
            value: district.toLowerCase(),
          }))}
        />
        <Input
          name="tag"
          placeholder="tags"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </form>
      <div className="flex gap-4">
        <Button onClick={handleReset} variant="secondary">
          Discard
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};
export default ReportPage;
