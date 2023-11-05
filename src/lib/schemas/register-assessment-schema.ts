import { number, string, z } from "zod";

export const RegisterAssessmentSchema = z.object({
  chest: number({ required_error: "Chest is required" }),
  abdomen: number({ required_error: "Abdomen is required" }),
  thigh: number({ required_error: "Thigh is required" }),
  triceps: number({ required_error: "Triceps is required" }),
  suprailiac: number({ required_error: "Suprailiac is required" }),
  weight: number({ required_error: "Weight is required" }),
  studentId: string({ required_error: "Student ID is required" }),
  assessmentType: string({ required_error: "Assessment Type is required" }),
});
