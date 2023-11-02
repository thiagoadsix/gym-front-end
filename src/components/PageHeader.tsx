"use client"

export function PageHeader({ title }: { title: string }) {
  return (
    <h1 className="font-sans text-5xl font-bold antialiased text-zinc-600 transition delay-150">
      {title}
    </h1>
  )
}