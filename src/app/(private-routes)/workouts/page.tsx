"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { ApiBaseResponseSchema, StudentWorkoutResponseSchema, StudentsResponseSchema } from "@/lib/schemas/response"

import { PageHeader } from "@/components/PageHeader"
import { ButtonIcon, ButtonRoot, ButtonText } from "@/components/Button"
import { TableContainer } from "@/components/Table/TableContainer"
import { TableHeader } from "@/components/Table/TableHeader"
import { TableRow } from "@/components/Table/TableRow"
import { Drawer } from "@/components/Drawer"
import { GenderType } from "@/lib/enums"

export default function Workouts() {
  const { push } = useRouter()
  const session = useSession()
  const [students, setStudents] = useState<Array<StudentsResponseSchema>>([]);
  const [studentWorkouts, setStudentWorkouts] = useState<Array<StudentWorkoutResponseSchema>>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<StudentWorkoutResponseSchema | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async (userId: string) => {
      try {
        const response = await fetch(`http://localhost:3002/api/student/${userId}/user`);
        const result: ApiBaseResponseSchema<{ students: Array<StudentsResponseSchema> }> = await response.json();

        if (result.status === "success") {
          setStudents(result.data.students);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    if (session.data?.user.id) {
      fetchStudents(session.data.user.id);
    }

  }, [session.data]);

  useEffect(() => {
    const fetchWorkouts = async (ids: string) => {
      try {
        const response = await fetch(`http://localhost:3004/api/workout-manager/${ids}/student`);
        const result: ApiBaseResponseSchema<{ workouts: Array<StudentWorkoutResponseSchema> }> = await response.json();

        if (result.status === "success") {
          setStudentWorkouts(result.data.workouts);
        }
      } catch (error) {
        console.error("Failed to fetch students workout:", error);
      }
    }

    const ids = students.map(student => student.id).join(",")

    if (ids) {
      fetchWorkouts(ids)
    }

  }, [students])

  const columnsHeader = ["Nome", "Altura", "Idade", "Sexo", "Treino"];

  const gendersMap = {
    [GenderType.MALE]: 'Masculino',
    [GenderType.FEMALE]: 'Feminino',
  }

  const handleTdClick = (workout: StudentWorkoutResponseSchema) => {
    setSelectedWorkout(workout);
    setIsDrawerOpen(true);
  };

  return (
    <div className="px-6">
      <PageHeader title={`Treinos`} />

      <ButtonRoot onClick={() => push('/workouts/register')}>
        <ButtonText>
          Cadastrar
        </ButtonText>
        <ButtonIcon>
          <Plus className="h-5 w-5 text-zinc-50 ml-1" />
        </ButtonIcon>
      </ButtonRoot>

      <TableContainer>
        <table className="w-full">
          <TableHeader columns={columnsHeader} />

          <tbody className="divide-y divide-zinc-100">
            {studentWorkouts.map((workout, index) => (
              <TableRow
                key={workout.id}
                data={{
                  Nome: workout.name,
                  Altura: workout.height,
                  Idade: workout.age.toString(),
                  Sexo: gendersMap[workout.gender],
                  Treino: `${workout.workout.objective} - Fase ${workout.workout.phase}`
                }}
                onClick={() => handleTdClick(workout)}
              />
            ))}
          </tbody>
        </table>
      </TableContainer>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
        <div className="space-y-4">
          {selectedWorkout && (
            <div>
              <h1 className="text-xl font-bold">Detalhes do treino do aluno:</h1>
              <p>Nome: {selectedWorkout.name}</p>
              <p>Altura: {selectedWorkout.height}</p>
              <p>Idade: {selectedWorkout.age}</p>
              <p>Sexo: {selectedWorkout.gender}</p>
              <p>Objetivo: {selectedWorkout.workout.objective}</p>
              <p>Fase: {selectedWorkout.workout.phase}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Exercícios:</h4>
                {selectedWorkout.workout.exercises.map((exercise, index) => (
                  <div key={index}>
                    <p>Nome: {exercise.name}</p>
                    <p>Séries: {exercise.sets}</p>
                    <p>Repetições: {exercise.repetitions.join(", ")}</p>
                    <p>Tipo: {exercise.type}</p>
                    <p>Link do vídeo: <a href={exercise.videoLink} target="_blank" rel="noopener noreferrer">Assistir</a></p>
                    <p>Observação: {exercise.observation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  )
}