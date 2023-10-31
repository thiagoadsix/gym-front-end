import { ComponentElement, ComponentProps, ElementType } from "react";

export interface NavItemProps extends ComponentProps<"a"> {
  title: string;
  icon: ElementType
  page: string
}

export function NavItem({ page, title, icon: Icon }: NavItemProps) {
  return (
    <a href={page} className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-amber-500">
      <Icon className="h-5 w-5 text-zinc-500 group-hover:text-amber-100" />
      <span className="font-medium text-zinc-700 group-hover:text-amber-100">{title}</span>
    </a>
  )
}