import { ReportType } from "@/validators/report-validators";
import { fetchUrl } from "./handler";
import { ServiceResponseType } from "@/types/handler-response.types";

export default class ReportHandler {
  public static createReport = (reportData: ReportType): Promise<any> => {
    return fetchUrl("/report/post", "POST", reportData);
  };
  public static getUnlabelledReports = (): Promise<
    ServiceResponseType<ReportType[]>
  > => {
    return fetchUrl("/report/fetchwithoutlabel", "GET");
  };
  public static getReportById = (
    id: string
  ): Promise<ServiceResponseType<ReportType>> => {
    return fetchUrl(`/report/id/${id}`, "GET");
  };
  public static updateReportLabel = (
    reportId: string,
    label: string[]
  ): Promise<ServiceResponseType<ReportType>> => {
    return fetchUrl(`/report/updateLabel`, "PUT", { postId: reportId, label });
  };
}
