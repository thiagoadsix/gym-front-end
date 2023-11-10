import { GenderType } from "@/lib/enums";

export interface StudentWorkoutResponseSchema {
  id: string;
  name: string;
  height: string;
  age: number;
  gender: GenderType;
  workout: WorkoutDetail;
}

interface WorkoutDetail {
  id: string;
  objective: string;
  phase: number;
  exercises: ExerciseDetail[];
}

interface ExerciseDetail {
  name: string;
  sets: number;
  repetitions: number[];
  type: string;
  videoLink: string;
  observation: string;
}
