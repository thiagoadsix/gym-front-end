import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    surname: z.string({ required_error: "Surname is required" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }),
    passwordConfirm: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
