"use client"

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const { push } = useRouter()

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-1 items-center justify-center">

        <form className="w-88 flex flex-col bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <label className="mb-2 self-start block">
              Name:
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 box-border"
              type="email"
              required
            />
          </div>

          <br />

          <div className="flex flex-col items-center">
            <label className="mb-2 self-start block">
              Email:
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 box-border"
              type="email"
              required
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
              required
            />
          </div>

          <a className="text-xs text-blue-500 mt-1" href="login" onClick={() => push("login")}>I already have an account</a>

          <button className="px-4 py-2 border-none rounded bg-blue-500 text-white cursor-pointer mt-6" >
            Login
          </button>
        </form>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Image src="/undraw_sign_up_n6im.svg" alt="An SVG of an eye" width={650} height={650} />
      </div>
    </div>
  );
}
