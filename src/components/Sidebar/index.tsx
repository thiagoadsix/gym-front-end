"use client"

import { Book, Users } from "lucide-react";
import { Logo } from "./Logo";
import { NavItem } from "./NavItem";
import { Profile } from "./Profile";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const { push } = useRouter()

  return (
    <aside className="flex flex-col gap-6 border-r border-zinc-200 px-5 py-8">
      <Logo />

      <nav className="space-y-0.5">
        <NavItem icon={Users} title="Alunos" page="/students" />
        <NavItem icon={Book} title="Avaliações" onClick={() => push("/assessments")} page="/assessments" />
        {/* <NavItem icon={Apple} title="Dietas" /> */}
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <div className="h-px bg-zinc-200" />

        <Profile />
      </div>
    </aside>
  )
}