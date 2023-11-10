"use client"

import { Book, Dumbbell, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { Profile } from "./Profile";

export function Sidebar() {
  const { push } = useRouter()

  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-200 px-5 py-8 sticky top-0 h-screen">
      <Logo />

      <nav className="space-y-0.5">
        <NavItem icon={Users} title="Alunos" onClick={() => push("/students")} page="/students" />
        <NavItem icon={Book} title="Avaliações" onClick={() => push("/assessments")} page="/assessments" />
        <NavItem icon={Dumbbell} title="Treinos" onClick={() => push("/workouts")} page="/workouts" />
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <div className="h-px bg-zinc-200" />

        <Profile />
      </div>
    </aside>
  )
}