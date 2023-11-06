import { GenderType } from "@/lib/enums";

export interface StudentsResponseSchema {
  id: string;
  userId: string;
  name: string;
  surname: string;
  birthDate: string;
  age: number;
  gender: GenderType;
  weight: number;
  height: number;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
