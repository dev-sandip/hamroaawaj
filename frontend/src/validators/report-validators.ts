import { z } from "zod";

export default class ReportValidator {
  public static ReportSchema = z.object({
    userId: z.string().min(3).max(255),
    title: z.string().min(3).max(255),
    location: z.string().min(3).max(255),
    tag: z.array(z.string()),
    text: z.string().min(3).max(255),
    files: z.array(z.string()),
  });

  public static validateReport = (reportData: Partial<ReportType>) => {
    return ReportValidator.ReportSchema.safeParse(reportData);
  };
}

export type ReportType = z.infer<typeof ReportValidator.ReportSchema> & {
  _id: string;
};
