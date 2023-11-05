import { nativeEnum, z } from "zod";

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const RegisterStudentSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  surname: z.string({ required_error: "Surname is required" }),
  weight: z.number({ required_error: "Weight is required" }),
  height: z.number({ required_error: "Height is required" }),
  birthDate: z.string({ required_error: "Birth Date is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string({ required_error: "State is required" }),
  gender: nativeEnum(GenderType, { required_error: "Gender is required" }),
});
