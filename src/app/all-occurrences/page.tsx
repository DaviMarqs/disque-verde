"use client";

import { Header } from "@/components/Header";
import OccurrencesTable from "@/components/OccurrencesTable";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AllOccurrencesPage() {
  return (
    <ProtectedRoute>
      <Header />
      <div className="flex min-h-screen justify-center flex-col bg-green-700">
        <div className="w-10/12 lg:w-2/4 p-4 rounded-lg  bg-slate-100 m-auto mt-16 mb-2 md:mt-0">
          <h1 className="text-2xl mb-4">Todas as ocorrências</h1>
          <OccurrencesTable />
        </div>
      </div>
    </ProtectedRoute>
  );
}
