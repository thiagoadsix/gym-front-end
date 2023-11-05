"use client"

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function Drawer({ isOpen, onClose, data }: DrawerProps) {
  if (!isOpen) return null;

  const genders: any = {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
  }

  const assessmentsTypes: any = {
    POLLOCK_3: 'Pollock de 3 dobras',
  }

  const translations: any = {
    chest: "Peito",
    thigh: "Coxa",
    tricep: "Tríceps",
    abdomen: "Abdômen",
    suprailiac: "Supra-ilíaco",
    bodyDensity: "Densidade Corporal",
    sumOfSkinfolds: "Soma das Dobras Cutâneas",
    bodyFatPercentage: "Percentual de Gordura Corporal"
  };


  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="p-6">
                <div className="mb-4">
                  <button onClick={onClose} className="bg-zinc-600 hover:bg-zinc-900 text-zinc-50 text-lg font-semibold rounded-lg px-2 py-1.5">X</button>
                </div>
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Informações do avaliado:</h1>
                  <p>Nome: {data.studentFullName}</p>
                  <p>Idade: {data.studentAge}</p>
                  <p>Altura: {data.studentHeight}</p>
                  <p>Sexo: {genders[data.studentGender]}</p>
                </div>
                <div className="space-y-4">
                  {data && data.assessments.map((assessment: any, index: number) => (
                    <div key={assessment.assessmentId} className="border p-4 rounded-lg">
                      <h3 className="font-bold">Avaliação {index + 1}</h3>
                      <p>Tipo: {assessmentsTypes[assessment.assessmentType]}</p>
                      <p>Data: {new Date(assessment.assessedAt).toLocaleDateString('pt-BR')}</p>
                      <div className="mt-2">
                        <h4 className="font-semibold">Dados da Avaliação:</h4>
                        {Object.entries(assessment.assessmentData).map(([key, value]) => (
                          <p key={key}>{translations[key] || key}: {value}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
