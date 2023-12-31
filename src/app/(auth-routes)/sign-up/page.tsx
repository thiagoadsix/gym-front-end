"use client"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { SignUpRequestSchema } from '@/lib/schemas/request';

import { InputControl, InputRoot } from "@/components/Input";
import { ButtonRoot, ButtonText } from "@/components/Button";
import { FormErrorMessage } from "@/components/FormErrorMessage";

type Input = z.infer<typeof SignUpRequestSchema>

export default function SignUp() {
  const { replace } = useRouter()
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Input>({ resolver: zodResolver(SignUpRequestSchema) })

  const onSubmit: SubmitHandler<Input> = async (data) => {
    reset()

    await fetch('http://localhost:3001/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    replace('/sign-in')
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:block relative w-0 flex-1 bg-zinc-600" />
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 x1:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3x font-semibold text-zinc-900">Criando conta</h2>
            <p className="mt-2 text-sm text-zinc-600 max-w">Já tem uma conta? <a href="/sign-in" onClick={() => replace("/sign-in")} className="font-bold text-zinc-900">Clique aqui!</a></p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <InputRoot>
                  <Controller
                    name='name'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="text" placeholder='Nome' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.name?.message} />
              </div>
              <div className="mb-4">
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
                <InputRoot>
                  <Controller
                    name='email'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="email" placeholder='Email' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.email?.message} />
              </div>
              <div className="mb-4">
                <InputRoot>
                  <Controller
                    name='password'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="password" placeholder='Senha' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.password?.message} />
              </div>
              <div className="mb-4">
                <InputRoot>
                  <Controller
                    name='passwordConfirm'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="password" placeholder='Confirme sua senha' />}
                  />
                </InputRoot>
                <FormErrorMessage message={errors.passwordConfirm?.message} />
              </div>
              <div className="mb-4">
                <ButtonRoot type="submit" className="w-full text-white bg-zinc-600 hover:bg-zinc-700 font-bold rounded px-3 py-2 text-center inline-flex items-center justify-center border-2 border-zinc-700">
                  <ButtonText>
                    Cadastrar
                  </ButtonText>
                </ButtonRoot>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
