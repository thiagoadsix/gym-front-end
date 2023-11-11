"use client"

import React from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { RegisterStudentRequestSchema } from '@/lib/schemas/request';
import { GenderType } from '@/lib/enums';

import { ButtonRoot, ButtonText } from '@/components/Button';
import { InputControl, InputRoot } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { SelectControl, SelectRoot } from '@/components/Select';
import { FormErrorMessage } from '@/components/FormErrorMessage';

type Input = z.infer<typeof RegisterStudentRequestSchema>

export default function RegisterStudent() {
  const session = useSession()
  const { push } = useRouter()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<Input>({
    resolver: zodResolver(RegisterStudentRequestSchema)
  })

  const onSubmit: SubmitHandler<Input> = async (data) => {
    reset()

    await fetch('http://localhost:3002/api/student', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, userId: session.data?.user.id })
    })

    push("/students")
  }

  const toNumber = (event: any, field: any) => {
    const numericValue = parseFloat(event.target.value);
    if (!isNaN(numericValue)) {
      field.onChange(numericValue);
    }
  }

  return (
    <div className="px-6">
      <PageHeader title='Registrando Aluno' />

      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded shadow-xl">
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Nome</label>
                <InputRoot>
                  <Controller
                    name="name"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type='text' placeholder='Nome' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.name?.message} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Sobrenome</label>
                <InputRoot>
                  <Controller
                    name='surname'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="text" placeholder='Sobrenome' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.surname?.message} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Data de Nascimento</label>
                <InputRoot>
                  <Controller
                    name='birthDate'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="date" />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.birthDate?.message} />
              </div>
              <div className="mb-4">
                <label htmlFor="genders" className="block mb-2 text-sm font-bold">Sexo</label>
                <SelectRoot>
                  <Controller
                    name="gender"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <SelectControl {...field} id="genders">
                        <option value={GenderType.FEMALE}>Feminino</option>
                        <option value={GenderType.MALE}>Masculino</option>
                      </SelectControl>
                    )}
                  />
                </SelectRoot>
                <FormErrorMessage message={errors.gender?.message} />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Altura</label>
                <InputRoot>
                  <Controller
                    name='height'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <InputControl
                        {...field}
                        type="text"
                        placeholder='Altura'
                        onChange={(event) => toNumber(event, field)}
                      />
                    )}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.height?.message} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Cidade</label>
                <InputRoot>
                  <Controller
                    name='city'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="text" placeholder='Cidade' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.city?.message} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Estado</label>
                <InputRoot>
                  <Controller
                    name='state'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="text" placeholder='Estado' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.state?.message} />
              </div>
            </div>
            <div>
              <ButtonRoot type='submit'>
                <ButtonText>
                  Registrar
                </ButtonText>
              </ButtonRoot>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
