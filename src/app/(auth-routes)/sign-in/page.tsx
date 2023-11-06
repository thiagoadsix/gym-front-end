"use client"

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { SignInRequestSchema } from "@/lib/schemas/request";

import { InputControl, InputRoot } from "@/components/Input";
import { ButtonRoot, ButtonText } from "@/components/Button";

type Input = z.infer<typeof SignInRequestSchema>

export default function SignIn() {
  const { replace } = useRouter()
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Input>({ resolver: zodResolver(SignInRequestSchema) })

  const onSubmit: SubmitHandler<Input> = async (data) => {
    reset()

    const { email, password } = data

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (result?.error) {
      console.error(result)
      return
    }

    replace('/home')
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:block relative w-0 flex-1 bg-zinc-600" />
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 x1:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3x font-semibold text-zinc-900">Sign-in</h2>
            <p className="mt-2 text-sm text-zinc-600 max-w">Novo por aqui? <a href="/sign-up" onClick={() => replace("/sign-up")} className="font-bold text-zinc-900">Teste agora!</a></p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <InputRoot>
                  <Controller
                    name='email'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => <InputControl {...field} type="email" placeholder='Email' />}
                  />
                </InputRoot>
                {errors.email?.message && (
                  <p className='text-sm text-red-600'>{errors.email.message}</p>
                )}
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
                {errors.password?.message && (
                  <p className='text-sm text-red-600'>{errors.password.message}</p>
                )}
              </div>
              <div className="mb-4">

                <ButtonRoot type="submit" className="w-full text-white bg-zinc-600 hover:bg-zinc-700 font-bold rounded px-3 py-2 text-center inline-flex items-center justify-center border-2 border-zinc-700">
                  <ButtonText>
                    Entrar
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
