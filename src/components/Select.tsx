"use client"

import { ComponentProps } from "react"

type SelectRootProps = ComponentProps<'div'>;

export function SelectRoot(props: SelectRootProps) {
  return (
    <div
      className="flex w-full items-center gap-2 bg-zinc-50 rounded border border-zinc-300 px-3 py-2.5 shadow-sm"
      {...props}
    />
  );
}

type SelectControlProps = ComponentProps<'select'>;

export function SelectControl(props: SelectControlProps) {
  return (
    <select
      className="flex-1 border-0 p-0 text-zinc-700 bg-zinc-50 focus:outline-none focus:shadow-outline"
      {...props}
    />
  );
}
