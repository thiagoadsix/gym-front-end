import { nativeEnum, number, string, z } from "zod";

import { AssessmentType } from "@/lib/enums";

export const RegisterAssessmentRequestSchema = z.object({
  chest: number({ required_error: "Chest is required" }),
  abdomen: number({ required_error: "Abdomen is required" }),
  thigh: number({ required_error: "Thigh is required" }),
  triceps: number({ required_error: "Triceps is required" }),
  suprailiac: number({ required_error: "Suprailiac is required" }),
  weight: number({ required_error: "Weight is required" }),
  studentId: string({ required_error: "Student ID is required" }),
  assessmentType: nativeEnum(AssessmentType, {
    required_error: "Assessment Type is required",
  }),
});
