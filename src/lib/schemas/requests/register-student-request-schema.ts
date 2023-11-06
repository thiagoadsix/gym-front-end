import { nativeEnum, z } from "zod";

import { GenderType } from "@/lib/enums";

export const RegisterStudentRequestSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  surname: z.string({ required_error: "Surname is required" }),
  height: z.number({ required_error: "Height is required" }),
  birthDate: z.string({ required_error: "Birth Date is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  gender: nativeEnum(GenderType, { required_error: "Gender is required" }),
});
