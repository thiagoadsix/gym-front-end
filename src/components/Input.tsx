"use client"

import { ComponentProps } from "react"

type InputPrefixProps = ComponentProps<'div'>

export function InputPrefix(props: InputPrefixProps) {
  return <div {...props} />
}

type InputControlProps = ComponentProps<'input'>

export function InputControl(props: InputControlProps) {
  return (
    <input
      className="flex-1 border-0 p-0 text-zinc-700 bg-zinc-50 focus:outline-none focus:shadow-outline"
      {...props}
    />
  )
}

type InputRootProps = ComponentProps<'div'>

export function InputRoot(props: InputRootProps) {
  return (
    <div
      className="flex w-full items-center gap-2 bg-zinc-50 rounded border border-zinc-300 px-3 py-2 shadow-sm"
      {...props}
    />
  )
}