"use client"

import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { RegisterWorkoutRequestSchema } from "@/lib/schemas/request"
import { ApiBaseResponseSchema, StudentsResponseSchema } from "@/lib/schemas/response"

import { PageHeader } from "@/components/PageHeader"
import { ButtonRoot, ButtonText } from "@/components/Button"
import { Step, Stepper } from "@/components/Stepper"
import { SelectControl, SelectRoot } from "@/components/Select"
import { InputControl, InputRoot } from "@/components/Input"

type Input = z.infer<typeof RegisterWorkoutRequestSchema>

export default function RegisterWorkout() {
  const [assessments, setAssessments] = useState<any>([]);
  const [assessmentId, setAssessmentId] = useState<string>()
  const [students, setStudents] = useState<Array<StudentsResponseSchema>>([]);
  const [studentId, setStudentId] = useState<string>();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { push } = useRouter()
  const session = useSession()
  const { reset, handleSubmit, setValue, control } = useForm<Input>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const addExercise = () => {
    append({
      name: "",
      sets: 0,
      repetitions: [0],
      type: "A",
      videoLink: "",
      observation: "",
    });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const userId = session.data?.user.id;
        const response = await fetch(`http://localhost:3002/api/student/${userId}/user`);
        const result: ApiBaseResponseSchema<{ students: Array<StudentsResponseSchema> }> = await response.json();

        if (result.status === "success") {
          setStudents(result.data.students);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchStudents();

    const fetchAssessments = async () => {
      try {
        const userId = session.data?.user.id;
        const response = await fetch(`http://localhost:3003/api/assessments/${userId}/user`);
        const result = await response.json();

        if (result.status === "success") {
          setAssessments(result.data.assessments);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchAssessments();
  }, [session]);

  useEffect(() => {
    console.log("students.length > 0")
    if (students.length > 0) {
      setStudentId(students[0].id);
    }
  }, [students]);

  useEffect(() => {
    console.log("assessments.length > 0")
    if (assessments.length > 0) {
      setAssessmentId(assessments[0].id);
    }
  }, [assessments]);

  useEffect(() => {
    console.log("studentId")
    if (studentId) {
      setValue('studentId', studentId, { shouldValidate: true });
    }
  }, [studentId, setValue]);

  useEffect(() => {
    console.log("assessmentId")
    if (assessmentId) {
      setValue('assessmentId', assessmentId, { shouldValidate: true });
    }
  }, [assessmentId, setValue]);

  const createWorkoutOnSubmit: SubmitHandler<Input> = async (data) => {
    reset()

    await fetch('http://localhost:3004/api/workout-manager', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, studentId, assessmentId })
    })

    push("/workouts")
  }

  const renderStudentOptions = () => {
    return students?.map((student) => (
      <option key={student.id} value={student.id}>
        {student.name} {student.surname}
      </option>
    ));
  };

  const renderAssessmentsOptions = () => {
    return assessments.map((assessment: any) => (
      <option key={assessment.id} value={assessment.id}>
        {assessment.name}
      </option>
    ));
  }

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setStudentId(selectedId);
    setValue('studentId', selectedId);
  };

  const handleAssessmentsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setAssessmentId(selectedId);
    setValue('assessmentId', selectedId);
  };

  return (
    <div className="px-6">
      <PageHeader title="Cadastrado treino" />

      <div className="flex flex-col items-center min-h-screen mt-16 mx-auto max-w-2xl">
        <form onSubmit={handleSubmit(createWorkoutOnSubmit)}>
          <Stepper currentStep={currentStep}>
            <Step title="Selecionar aluno">
              <SelectRoot>
                <Controller
                  name="studentId"
                  control={control}
                  render={({ field }) => (
                    <SelectControl {...field} onChange={handleStudentChange}>
                      {renderStudentOptions()}
                    </SelectControl>
                  )}
                />
              </SelectRoot>
            </Step>
            <Step title="Selecionar avaliação">
              <SelectRoot>
                <Controller
                  name="assessmentId"
                  control={control}
                  render={({ field }) => (
                    <SelectControl {...field} onChange={handleAssessmentsChange}>
                      {renderAssessmentsOptions()}
                    </SelectControl>
                  )}
                />
              </SelectRoot>
            </Step>
            <Step title="Inserir Informações">
              <div className="space-y-4">
                <InputRoot>
                  <Controller
                    name='objective'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="text" placeholder='Objetivo' />}
                  />
                </InputRoot>
                <InputRoot>
                  <Controller
                    name='phase'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="number" placeholder='Fase' onChange={(e) => field.onChange(parseInt(e.target.value))} />}
                  />
                </InputRoot>
              </div>
            </Step>
            <Step title="Treinos">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  <InputRoot>
                    <Controller
                      name={`exercises.${index}.name`}
                      control={control}
                      render={({ field }) => <InputControl {...field} type="text" placeholder="Nome do Exercício" />}
                    />
                  </InputRoot>
                  <InputRoot>
                    <Controller
                      name={`exercises.${index}.sets`}
                      control={control}
                      render={({ field }) => <InputControl {...field} type="number" placeholder="Sets" onChange={(e) => field.onChange(parseInt(e.target.value))} />}
                    />
                  </InputRoot>
                  <InputRoot>
                    <Controller
                      name={`exercises.${index}.repetitions`}
                      control={control}
                      render={({ field }) => (
                        <InputControl
                          {...field}
                          type="text"
                          placeholder="Séries"
                          value={field.value.join(', ')}
                          onChange={(e) => {
                            const reps = e.target.value.split(',').map((rep) => parseInt(rep.trim())).filter((rep) => !isNaN(rep));
                            field.onChange(reps);
                          }}
                        />
                      )}
                    />
                  </InputRoot>
                  <InputRoot>
                    <Controller
                      name={`exercises.${index}.type`}
                      control={control}
                      render={({ field }) => <InputControl {...field} type="text" placeholder="Tipo" />}
                    />
                  </InputRoot>
                  <InputRoot>
                    <Controller
                      name={`exercises.${index}.videoLink`}
                      control={control}
                      render={({ field }) => <InputControl {...field} type="text" placeholder="Link do Vídeo" />}
                    />
                  </InputRoot>
                  <InputRoot>
                    <Controller
                      name={`exercises.${index}.observation`}
                      control={control}
                      render={({ field }) => <InputControl {...field} type="text" placeholder="Observação" />}
                    />
                  </InputRoot>

                  <button type="button" onClick={() => remove(index)}>
                    Remover Exercício
                  </button>
                </div>
              ))}
              <button type="button" onClick={addExercise}>
                Adicionar mais um treino
              </button>
            </Step>
          </Stepper>

          <div className="flex justify-between mt-8 w-full">
            {currentStep > 0 ? (
              <ButtonRoot onClick={prevStep} type="button">
                <ChevronLeftIcon />
                <ButtonText>
                  Voltar
                </ButtonText>
              </ButtonRoot>
            ) : (
              <div></div>
            )}
            {currentStep < 3 ? (
              <ButtonRoot onClick={nextStep} type="button">
                <ChevronRightIcon />
                <ButtonText>
                  Próximo
                </ButtonText>
              </ButtonRoot>
            ) : (
              <div></div>
            )}
          </div>

          {currentStep === 3 && (
            <div className="mt-4 w-full">
              <ButtonRoot type="submit" className="w-full text-white bg-zinc-600 hover:bg-zinc-700 font-bold rounded px-3 py-2 text-center inline-flex items-center justify-center border-2 border-zinc-700">
                <ButtonText>
                  Cadastrar
                </ButtonText>
              </ButtonRoot>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}