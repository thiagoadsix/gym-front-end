"use client"

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Profile() {
  const session: any = useSession()
  const { push } = useRouter()

  const getInitials = (name: string, surname: string) => {
    let initials = "";
    if (name) initials += name[0];
    if (surname) {
      const surnameParts = surname.split(" ");
      initials += surnameParts[surnameParts.length - 1][0];
    }
    return initials.toUpperCase();
  };

  const userInitials = session.data?.user ? getInitials(session.data.user.name, session.data.user.surname) : ":(";

  const handleSubmit = async () => {
    await signOut({ redirect: false });

    push("/login")
  }

  return (
    <div className="grid items-center gap-3 grid-cols-profile">
      <h1 className="bg-zinc-500 p-4 rounded text-zinc-100">{userInitials}</h1>

      <div className="flex flex-col truncate">
        <span className="text-sm font-semibold text-zinc-700 truncate">{session.data?.user?.name} {session.data?.user?.surname}</span>
        <span className="text-sm text-zinc-500 truncate">{session.data?.user?.email}</span>
      </div>

      <button type="button" className="ml-auto p-2 hover:bg-zinc-100 rounded">
        <LogOut className="h-5 w-5 text-zinc-500" onClick={handleSubmit} />
      </button>
    </div>
  )
}