"use client"

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Button } from "./button";

export default function ButtonLogout() {
  const { replace } = useRouter()

  async function logout() {
    await signOut({
      redirect: false,
    })

    replace('/login')
  }


  return <Button onClick={logout}>Sair</Button>;
}