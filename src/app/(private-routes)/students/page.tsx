"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { GenderType } from "@/lib/enums"
import { ApiBaseResponseSchema, StudentsResponseSchema } from "@/lib/schemas/response"

import { PageHeader } from "@/components/PageHeader"
import { TableContainer } from "@/components/Table/TableContainer"
import { TableHeader } from "@/components/Table/TableHeader"
import { TableRow } from "@/components/Table/TableRow"
import { ButtonIcon, ButtonRoot, ButtonText } from "@/components/Button"

export default function Students() {
  const { push } = useRouter()
  const session = useSession()
  const [studentsData, setStudentsData] = useState<Array<StudentsResponseSchema>>([]);

  useEffect(() => {
    const fetchStudents = async (userId: string) => {
      try {
        const response = await fetch(`http://localhost:3002/api/student/${userId}/user`);
        const result: ApiBaseResponseSchema<{ students: Array<StudentsResponseSchema> }> = await response.json();

        if (result.status === "success") {
          setStudentsData(result.data.students);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    if (session.data?.user?.id) {
      fetchStudents(session.data.user.id);
    }
  }, [session.data]);

  const gendersMap = {
    [GenderType.MALE]: 'Masculino',
    [GenderType.FEMALE]: 'Feminino',
  }

  const columnsHeader = ["Nome", "Data de Nascimento", "Idade", "Altura", "Sexo"];
  const transformedData = studentsData.map((student) => ({
    nome: `${student.name} ${student.surname}`,
    nascimento: student.birthDate,
    idade: student.age,
    altura: student.height,
    sexo: gendersMap[student.gender],
  }));


  return (
    <div className="px-6">
      <PageHeader title={`Alunos`} />

      <ButtonRoot onClick={() => push('/students/register')}>
        <ButtonText>
          Cadastrar
        </ButtonText>
        <ButtonIcon>
          <Plus className="h-5 w-5 text-zinc-50 ml-1" />
        </ButtonIcon>
      </ButtonRoot>

      <TableContainer>
        <table className="w-full">
          <TableHeader columns={columnsHeader} />

          <tbody className="divide-y divide-zinc-100">
            {transformedData.map((student: any, index: any) => (
              <TableRow key={index} data={student} onClick={() => { }} />
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  )
}