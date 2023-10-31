"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Students() {
  const { replace } = useRouter()
  return (
    <div className="px-6">
      <h1
        className="font-sans text-5xl font-bold antialiased text-amber-600 transition delay-150"
      >
        Alunos
      </h1>

      <a onClick={() => replace('/register')} href="/students/register" className="cursor-pointer my-6 text-white bg-amber-600 hover:bg-amber-700 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center border-2 border-amber-700">
        Cadastrar
        <Plus className="h-5 w-5 text-zinc-50 ml-1" />
      </a>

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-amber-200 border-b-2 border-amber-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Nome</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Data de Nascimento</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Idade</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Altura</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Sexo</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Peso</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100">
            <tr className="bg-zinc-50">
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">Thiago Andrade Silva</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">25/01/2000</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">23</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">1.73</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">Masculino</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">72.30</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">Thainá Da Paz</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">17/09/2002</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">21</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">1.68</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">Feminino</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">59.10</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">Kamilla Andrade Silva</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">24/09/2004</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">18</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">1.68</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">Feminino</td>
              <td className="p-3 text-sm text-zinc-700 whitespace-nowrap">55.50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}