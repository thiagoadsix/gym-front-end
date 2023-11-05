"use client"

import { useEffect, useState } from "react"
import { ChevronsRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { ButtonIcon, ButtonRoot, ButtonText } from "@/components/Button"
import { PageHeader } from "@/components/PageHeader"
import { TableContainer } from "@/components/Table/TableContainer"
import { TableHeader } from "@/components/Table/TableHeader"
import { TableRow } from "@/components/Table/TableRow"
import { Drawer } from "@/components/Drawer"

export default function Assessments() {
  const { push } = useRouter()
  const session: any = useSession()
  const [assessmentData, setAssessmentData] = useState<any>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const columnsHeader = ["Nome", "Última Avaliação", "Avaliações"];
  const transformedData = assessmentData.map((assessment: any) => {
    const lastAssessmentDate = assessment.assessments.reduce((latestDate: any, current: any) => {
      const currentDate = new Date(current.assessedAt);
      return (latestDate > currentDate) ? latestDate : currentDate;
    }, new Date(0));

    const formattedDate = lastAssessmentDate.toLocaleDateString('pt-BR');

    return {
      nome: assessment.studentFullName,
      "Última Avaliação": formattedDate,
      "avaliações": assessment.assessments.length,

    };
  });

  const handleTdClick = (assessment: any) => {
    setSelectedAssessment(assessment);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const userId = session.data.user.id;
        const response = await fetch(`http://localhost:3003/api/assessments/${userId}/user`);
        const result = await response.json();

        if (result.status === "success") {
          setAssessmentData(result.data.assessments);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

    fetchAssessments();
  }, [session]);

  return (
    <div className="px-6">
      <PageHeader title='Avaliações' />

      <ButtonRoot onClick={() => push('assessments/register')}>
        <ButtonText>
          Iniciar avaliação
        </ButtonText>
        <ButtonIcon>
          <ChevronsRight className="h-5 w-5 text-zinc-50 ml-1" />
        </ButtonIcon>
      </ButtonRoot>

      {/* Separar as tabelas por MESES! */}
      <TableContainer>
        <table className="w-full">
          <TableHeader columns={columnsHeader} />

          <tbody className="divide-y divide-zinc-100">
            {assessmentData.map((assessment: any, index: any) => (
              <TableRow key={index} data={transformedData[index]} onClick={() => handleTdClick(assessment)} />
            ))}
          </tbody>
        </table>
      </TableContainer>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} data={selectedAssessment} />
    </div>
  )
}