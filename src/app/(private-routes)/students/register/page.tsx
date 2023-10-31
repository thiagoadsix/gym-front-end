"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function RegisterStudent() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const { push } = useRouter()

  const handleBirthDateChange = (event: any) => {
    const birthDateValue = event.target.value;
    setBirthDate(birthDateValue);

    const today = new Date();
    const birthDateObj = new Date(birthDateValue);
    const ageValue = today.getFullYear() - birthDateObj.getFullYear();
    setAge(ageValue as any);
  };

  const handleSaveAndGoToStudents = async () => {
    // Emule a requisição para a API para salvar o usuário
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Redirecionar o usuário para a página de students
    push('/students');
  };

  const handleSaveAndGoToAssessments = async () => {
    // Emule a requisição para a API para salvar o usuário
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Redirecionar o usuário para a página de assessments
    push('/assessments');
  };

  return (
    <div className="px-6">
      <h1
        className="font-sans text-5xl font-bold antialiased text-amber-600 transition delay-150"
      >
        Registrando aluno
      </h1>
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded shadow-xl">
          <form className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="firstName">Nome</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="Nome" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="lastName">Sobrenome</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Sobrenome" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="birthDate">Data de Nascimento</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="birthDate" type="date" value={birthDate} onChange={handleBirthDateChange} />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="age">Idade</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="age" type="text" value={age} readOnly />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="lastName">Peso</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Sobrenome" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="lastName">Altura</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Sobrenome" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="lastName">Cidade</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Sobrenome" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold" htmlFor="lastName">Estado</label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Sobrenome" />
              </div>
            </div>
          </form>
          <div className="mt-4">
            <button
              className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={handleSaveAndGoToStudents}
            >
              Registrar
            </button>
            <button
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
              onClick={handleSaveAndGoToAssessments}
            >
              Registrar e iniciar avaliação
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
