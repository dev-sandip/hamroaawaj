import { ReportType } from "@/validators/report-validators";
import { fetchUrl } from "./handler";

export default class ReportHandler {
  public static createReport = (
    reportData: ReportType
  ): Promise<any> => {
    return fetchUrl("/report/post", "POST", reportData);
  };
}
