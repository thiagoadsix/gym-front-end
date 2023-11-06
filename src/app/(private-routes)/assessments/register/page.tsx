"use client"

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { AssessmentType } from "@/lib/enums";
import { RegisterAssessmentRequestSchema } from "@/lib/schemas/request";
import { ApiBaseResponseSchema, StudentsResponseSchema } from "@/lib/schemas/response";

import { ButtonRoot, ButtonText } from "@/components/Button";
import { InputControl, InputRoot } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Step, Stepper } from "@/components/Stepper";
import { SelectControl, SelectRoot } from "@/components/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Input = z.infer<typeof RegisterAssessmentRequestSchema>

const assessments = [{ assessment: "Pollock de 3 dobras", slug: AssessmentType.POLLOCK_3 }, { assessment: "Pollock de 7 dobras", slug: AssessmentType.POLLOCK_7 }, { assessment: "Bioimpedância", slug: AssessmentType.BIOIMPEDANCE }]

export default function RegisterAssessment() {
  const { push } = useRouter()
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, touchedFields },
    setValue,
    getValues
  } = useForm<Input>({ resolver: zodResolver(RegisterAssessmentRequestSchema), mode: 'onSubmit' })
  const session = useSession()
  const [activeForm, setActiveForm] = useState<AssessmentType>(AssessmentType.POLLOCK_3);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [allStudents, setAllStudents] = useState<Array<StudentsResponseSchema>>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  useEffect(() => {
    const getAllStudentsById = async () => {
      try {
        const userId = session.data?.user.id;
        const response = await fetch(`http://localhost:3002/api/student/${userId}/user`);
        const result: ApiBaseResponseSchema<{ students: Array<StudentsResponseSchema> }> = await response.json();

        if (result.status === "success") {
          setAllStudents(result.data.students);
          if (result.data.students.length > 0) {
            const firstStudentId = result.data.students[0].id;
            setValue('studentId', firstStudentId);
            setSelectedStudentId(firstStudentId);
          }
        }

        if (assessments.length > 0) {
          setValue('assessmentType', assessments[0].slug);
          setActiveForm(assessments[0].slug);
        }

      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    }

    getAllStudentsById();
  }, [session, setValue]);


  const createAssessmentOnSubmit: SubmitHandler<Input> = async (data) => {
    reset()

    await fetch('http://localhost:3003/api/assessments', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    push("/assessments")
  }

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedStudentId(selectedId);
    setValue('studentId', selectedId);
  };

  const handleAssessmentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType: AssessmentType = event.target.value as AssessmentType;
    setActiveForm(selectedType);
    setValue('assessmentType', selectedType);
  };

  const Pollock3Form = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Abdômen</label>
        <InputRoot>
          <Controller
            name='abdomen'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <InputControl
                {...field}
                type="text"
                placeholder='Abdômen'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(isNaN(value) ? '' : value);
                }}
              />
            )}
          />
        </InputRoot>
        {errors.abdomen && touchedFields.abdomen && (
          <p className='text-sm text-red-600'>{errors.abdomen.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Peito</label>
        <InputRoot>
          <Controller
            name='chest'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <InputControl
                {...field}
                type="text"
                placeholder='Peito'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(isNaN(value) ? '' : value);
                }}
              />
            )}
          />
        </InputRoot>
        {errors.chest && touchedFields.chest && (
          <p className='text-sm text-red-600'>{errors.chest.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Supra-ilíaco</label>
        <InputRoot>
          <Controller
            name='suprailiac'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <InputControl
                {...field}
                type="text"
                placeholder='Supra-ilíaco'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(isNaN(value) ? '' : value);
                }}
              />
            )}
          />
        </InputRoot>
        {errors.suprailiac && touchedFields.suprailiac && (
          <p className='text-sm text-red-600'>{errors.suprailiac.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Coxa</label>
        <InputRoot>
          <Controller
            name='thigh'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <InputControl
                {...field}
                type="text"
                placeholder='Coxa'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(isNaN(value) ? '' : value);
                }}
              />
            )}
          />
        </InputRoot>
        {errors.thigh && touchedFields.thigh && (
          <p className='text-sm text-red-600'>{errors.thigh.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Tríceps</label>
        <InputRoot>
          <Controller
            name='triceps'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <InputControl
                {...field}
                type="text"
                placeholder='Tríceps'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(isNaN(value) ? '' : value);
                }}
              />
            )}
          />
        </InputRoot>
        {errors.triceps && touchedFields.triceps && (
          <p className='text-sm text-red-600'>{errors.triceps.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Peso</label>
        <InputRoot>
          <Controller
            name='weight'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <InputControl
                {...field}
                type="text"
                placeholder='Peso'
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(isNaN(value) ? '' : value);
                }}
              />
            )}
          />
        </InputRoot>
        {errors.weight && touchedFields.weight && (
          <p className='text-sm text-red-600'>{errors.weight.message}</p>
        )}
      </div>
    </>
  )

  const Pollock7Form = () => (
    <h1>Serei o Pollock de 7 dobras</h1>
  );

  const BioimpedanceForm = () => (
    <h1>Serei o Bioimpedância</h1>
  )

  const renderStudentOptions = () => {
    return allStudents?.map((student) => (
      <option key={student.id} value={student.id}>
        {student.name} {student.surname}
      </option>
    ));
  };

  const renderAssessmentOptions = () => {
    return assessments.map((assessment) => (
      <option key={assessment.slug} value={assessment.slug}>
        {assessment.assessment}
      </option>
    ));
  }

  const renderForm = () => {
    switch (activeForm) {
      case AssessmentType.POLLOCK_3:
        return <Pollock3Form />;
      case AssessmentType.POLLOCK_7:
        return <Pollock7Form />;
      case AssessmentType.BIOIMPEDANCE:
        return <BioimpedanceForm />;
      default:
        return null;
    }
  };

  const renderReview = () => {
    const student = allStudents.find((student) => student.id === selectedStudentId)

    if (!student) {
      return <option>Carregando informações do aluno...</option>;
    }

    const formValues = getValues();

    const assessmentTypeMap = {
      [AssessmentType.POLLOCK_3]: "Pollock de 3 dobras",
      [AssessmentType.POLLOCK_7]: "Pollock de 7 dobras",
      [AssessmentType.BIOIMPEDANCE]: "Bioimpedância"
    }

    const assessments = {
      assessmentType: assessmentTypeMap[formValues.assessmentType],
      abdomen: formValues.abdomen,
      chest: formValues.chest,
      suprailiac: formValues.suprailiac,
      thigh: formValues.thigh,
      triceps: formValues.triceps,
      weight: formValues.weight,
    };

    return (
      <div className="flex flex-wrap justify-around mt-6">
        <div className="w-full md:w-1/2 mb-6">
          <h2 className="text-lg font-semibold">Informações do Aluno</h2>
          <p><strong>Nome:</strong> {student?.name} {student?.surname}</p>
          <p><strong>Idade:</strong> {student?.age}</p>
          <p><strong>Peso:</strong> {student?.weight} kg</p>
          <p><strong>Altura:</strong> {student?.height} m</p>
          <p><strong>Gênero:</strong> {student?.gender === 'MALE' ? 'Masculino' : 'Feminino'}</p>
          <p><strong>Cidade:</strong> {student?.city}</p>
          <p><strong>Estado:</strong> {student?.state}</p>
          <p><strong>Data de Nascimento:</strong> {student?.birthDate}</p>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold">Informações da Avaliação</h2>
          <p><strong>Tipo de Avaliação:</strong> {assessments.assessmentType}</p>
          <p><strong>Abdômen:</strong> {assessments.abdomen} mm</p>
          <p><strong>Peito:</strong> {assessments.chest} mm</p>
          <p><strong>Supra-ilíaco:</strong> {assessments.suprailiac} mm</p>
          <p><strong>Coxa:</strong> {assessments.thigh} mm</p>
          <p><strong>Tríceps:</strong> {assessments.triceps} mm</p>
          <p><strong>Peso:</strong> {assessments.weight} kg</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <PageHeader title='Realizando Avaliação' />

      <div className="flex flex-col items-center min-h-screen mt-16 mx-auto max-w-2xl">
        <form onSubmit={handleSubmit(createAssessmentOnSubmit)}>
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
            <Step title="Escolher Tipo de Avaliação">
              <SelectRoot>
                <Controller
                  name="assessmentType"
                  control={control}
                  render={({ field }) => (
                    <SelectControl {...field} onChange={handleAssessmentTypeChange}>
                      {renderAssessmentOptions()}
                    </SelectControl>
                  )}
                />
              </SelectRoot>
            </Step>
            <Step title="Inserir Informações">
              {renderForm()}
            </Step>
            <Step title="Revisão e Confirmação">
              {renderReview()}
            </Step>
          </Stepper>

          <div className="flex justify-between mt-8 w-full">
            {currentStep > 0 ? (
              <ButtonRoot onClick={prevStep} type="submit">
                <ChevronLeftIcon />
                <ButtonText>
                  Voltar
                </ButtonText>
              </ButtonRoot>
            ) : (
              <div></div>
            )}
            {currentStep < 3 ? (
              <ButtonRoot onClick={nextStep} type="submit">
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
                  Confirmar Avaliação
                </ButtonText>
              </ButtonRoot>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}