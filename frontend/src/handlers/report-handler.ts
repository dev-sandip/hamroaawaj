import { ReportType } from "@/validators/report-validators";
import { fetchUrl } from "./handler";
import { ServiceResponseType } from "@/types/handler-response.types";
import { CommentType } from "@/types/report.types";

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
  public static getAllReports = (): Promise<
    ServiceResponseType<ReportType[]>
  > => {
    return fetchUrl("/report/fetchall", "GET");
  };

  public static markAsComplete = (
    reportId: string
  ): Promise<ServiceResponseType<ReportType>> => {
    return fetchUrl(`/report/compeleteReport`, "PUT", { reportId: reportId });
  };
  public static addComment = (
    reportId: string,
    userId: string,
    comment: string
  ): Promise<ServiceResponseType<CommentType>> => {
    return fetchUrl(`/report/comment`, "POST", {
      reportId,
      commentText: comment,
      userId,
    });
  };
  public static getComments = (
    reportId: string
  ): Promise<ServiceResponseType<CommentType[]>> => {
    return fetchUrl(`/report/comments/${reportId}`, "GET");
  };
}
