import { nativeEnum, number, string, z } from "zod";

import { AssessmentType } from "@/lib/enums";

const isValidDate = (dateString: string) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const parts = dateString.match(regex);
  if (!parts) return false;

  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[2], 10) - 1;
  const year = parseInt(parts[3], 10);

  if (year < 1000 || year > 3000 || month < 0 || month > 11) {
    return false;
  }

  const date = new Date(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
};

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
  startDate: string().refine(isValidDate, {
    message:
      "Data inválida. O formato deve ser DD/MM/YYYY e representar uma data real.",
  }),
  endDate: string().refine(isValidDate, {
    message:
      "Data inválida. O formato deve ser DD/MM/YYYY e representar uma data real.",
  }),
});
