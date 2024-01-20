import { z } from "zod";

export default class ReportValidator {
  public static ReportSchema = z.object({
    userId: z.string(),
    title: z.string().min(3).max(255),
    location: z.string().min(3).max(255),
    tag: z.array(z.string()),
    text: z.string().min(3),
    files: z.array(z.string()),
    isCompleted: z.boolean().default(false),
  });

  public static validateReport = (reportData: Partial<ReportType>) => {
    return ReportValidator.ReportSchema.safeParse(reportData);
  };
}

export type ReportType = z.infer<typeof ReportValidator.ReportSchema> & {
  _id: string;
  labels: string[];
  upvote: string[];
  downvote: string[];
  createdAt: string;
};
