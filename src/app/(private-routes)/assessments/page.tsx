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
import { GenderType, Status } from "@/lib/enums"

export default function Assessments() {
  const { push } = useRouter()
  const session = useSession()
  const [assessmentData, setAssessmentData] = useState<any>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);

  const columnsHeader = [
    "Nome",
    // "Última Avaliação",
    "Avaliações"];
  const transformedData = assessmentData.map((assessment: any) => {
    // const lastAssessmentDate = assessment.assessments.reduce((latestDate: any, current: any) => {
    //   const currentDate = new Date(current.assessedAt);
    //   return (latestDate > currentDate) ? latestDate : currentDate;
    // }, new Date(0));

    // const formattedDate = lastAssessmentDate.toLocaleDateString('pt-BR');

    return {
      nome: assessment.studentFullName,
      // "Última Avaliação": formattedDate,
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
        const userId = session.data?.user.id;
        const response = await fetch(`http://localhost:3003/api/assessments/students/${userId}/user`);
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

  const gendersMap: any = {
    [GenderType.MALE]: 'Masculino',
    [GenderType.FEMALE]: 'Feminino',
  };

  const statusMap: any = {
    [Status.IN_PROGRESS]: 'Em progresso',
    [Status.COMPLETE]: 'Finalizado',
  };

  const assessmentTypes: any = {
    POLLOCK_3: 'Pollock de 3 dobras',
  };

  const translations: any = {
    chest: "Peito",
    thigh: "Coxa",
    triceps: "Tríceps",
    abdomen: "Abdômen",
    suprailiac: "Supra-ilíaco",
    bodyDensity: "Densidade Corporal",
    sumOfSkinfolds: "Soma das Dobras Cutâneas",
    bodyFatPercentage: "Percentual de Gordura Corporal",
    weight: "Peso",
  };

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

      {/* Trecho para separar as tabelas por Meses. */}
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

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
        <div className="mb-4">
          <h1 className="text-xl font-bold">Informações do avaliado:</h1>
          <p>Nome: {selectedAssessment?.studentFullName}</p>
          <p>Idade: {selectedAssessment?.studentAge}</p>
          <p>Altura: {selectedAssessment?.studentHeight} cm</p>
          <p>Sexo: {gendersMap[selectedAssessment?.studentGender]}</p>
        </div>
        <div className="space-y-4">
          {selectedAssessment && selectedAssessment?.assessments.map((assessment: any, index: number) => (
            <div key={assessment.assessmentId} className="border p-4 rounded-lg">
              <h3 className="font-bold">Avaliação {index + 1}</h3>
              <p>Tipo: {assessmentTypes[assessment.assessmentType]}</p>
              <p>Data início: {new Date(assessment.startDate).toLocaleDateString('pt-BR')}</p>
              <p>Data fim: {new Date(assessment.endDate).toLocaleDateString('pt-BR')}</p>
              <p>Status: {statusMap[assessment.status]}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Dados da Avaliação:</h4>
                {Object.entries(assessment.assessmentData).map(([key, value]) => (
                  <p key={key}>{translations[key] || key}: {value}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  )
}