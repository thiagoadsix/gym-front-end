import { array, number, object, string, z } from "zod";

const exerciseTypeSchema = z.enum(["A", "B", "C", "D", "E"]);

const exerciseInputSchema = object({
  name: string({ required_error: "Name is required" }),
  sets: number({ required_error: "Sets are required" }),
  repetitions: array(number()).nonempty({
    message: "At least one repetition is required",
  }),
  type: exerciseTypeSchema,
  videoLink: string().url().optional(),
  observation: string().optional(),
});

export const RegisterWorkoutRequestSchema = object({
  studentId: string({ required_error: "Student ID is required" }),
  assessmentId: string({ required_error: "Assessment ID is required" }),
  objective: string({ required_error: "Objective is required" }),
  phase: number({ required_error: "Phase is required" }),
  exercises: array(exerciseInputSchema).nonempty({
    message: "At least one exercise is required",
  }),
});
