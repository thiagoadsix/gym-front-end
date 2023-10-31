"use client"

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function Profile() {
  return (
    <div className="grid items-center gap-3 grid-cols-profile">
      <h1 className="bg-amber-500 p-4 rounded text-amber-100">FL</h1>

      <div className="flex flex-col truncate">
        <span className="text-sm font-semibold text-zinc-700 truncate">Fernando Lima</span>
        <span className="text-sm text-zinc-500 truncate">fernando.lima@email.com</span>
      </div>

      <button type="button" className="ml-auto p-2 hover:bg-zinc-100 rounded">
        <LogOut className="h-5 w-5 text-zinc-500" onClick={() => signOut()} />
      </button>
    </div>
  )
}