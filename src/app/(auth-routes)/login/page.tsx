"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const { push, replace } = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

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
    <div className="flex h-screen w-screen">
      <div className="flex flex-1 items-center justify-center">
        <form className="w-88 flex flex-col bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit} >
          <div className="flex flex-col items-center">
            <label className="mb-2 self-start block">
              Email:
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 box-border"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />

          <div className="flex flex-col items-center">
            <label className="mb-2 self-start block">
              Password:
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 box-border"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a className="text-xs text-blue-500 mt-1" href="register" onClick={() => push("register")}>I do not have an account</a>

          <button className="px-4 py-2 border-none rounded bg-blue-500 text-white cursor-pointer mt-6" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Image src="undraw_login_re_4vu2.svg" alt="An SVG of an eye" width={650} height={650} priority />
      </div>
    </div>
  );
}
