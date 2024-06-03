"use client";

import { handleTranslateOccurrenceType } from "@/app/utils/translate-occurrence-type";
import { format } from "date-fns";
import { Check, Clock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "../ui/use-toast";

interface InfosModalProps {
  occurrenceId: string;
  setIsModalOpen: (value: boolean) => void;
  getAllOccurrences: () => void;
  deleteOccurrence: () => void;
  loadingDelete: boolean;
  changeOccurrenceStatus: () => void;
  loadingStatus: boolean;
}

interface Occurrence {
  _id: string;
  description: string;
  occurrence_type: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  informer_name?: string;
  informer_email?: string;
  informer_phone?: string;
  informer_address?: string;
  informer_anonymous?: boolean;
  occurrence_date: string;
  occurrence_time: string;
  occurrence_location: string;
}

const fieldTranslations = [
  {
    field: "informer_anonymous",
    translation: "Anônimo",
    format: "formatAnonymous",
  },
  { field: "occurrence_date", translation: "Data", format: "formatDate" },
  { field: "occurrence_time", translation: "Hora" },
  { field: "occurrence_location", translation: "Local" },
  { field: "status", translation: "Status", format: "formatStatus" },
  { field: "description", translation: "Descrição" },
  { field: "informer_name", translation: "Nome" },
  { field: "informer_email", translation: "Email" },
  { field: "informer_phone", translation: "Telefone" },
  { field: "informer_address", translation: "Endereço" },
  {
    field: "occurrence_type",
    translation: "Tipo",
    format: "translateOccurrenceType",
  },
  { field: "createdAt", translation: "Criada em", format: "formatDate" },
  { field: "updatedAt", translation: "Atualizada em", format: "formatDate" },
];

export default function InfosModal({
  occurrenceId,
  deleteOccurrence,
  changeOccurrenceStatus,
  loadingDelete,
  loadingStatus,
}: InfosModalProps) {
  const [occurrence, setOccurrence] = useState({} as Occurrence);

  const formatStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock color="orange" className="ml-2" />;
      case "CONCLUDED":
        return <Check color="green" className="ml-2" />;
      default:
        return status;
    }
  };

  const formatAnonymous = (value: string) => (value ? "Sim" : "Não");

  const formatDate = (date: string) =>
    format(new Date(date), "dd/MM/yyyy HH:mm");

  const getData = async () => {
    if (!occurrenceId) return;

    try {
      const response = await fetch(`/api/occurrences?id=${occurrenceId}`);
      const data = await response.json();
      setOccurrence(data.occurrence);
    } catch (error) {
      console.error("Erro ao buscar ocorrência: ", error);
      toast({
        title: "Erro ao buscar ocorrência",
        description: "Ocorreu um erro ao buscar a ocorrência",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getData();
  }, [occurrenceId]);

  return (
    <DialogContent className="h-[90%] w-full overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Detalhes</DialogTitle>
        <DialogDescription>
          Aqui você pode ver todos os detalhes da ocorrência!
        </DialogDescription>
        <div className="flex flex-col items-center justify-center">
          {occurrence.image && (
            <div className="flex justify-center mx-auto">
              <Image
                src={occurrence.image}
                alt="Imagem da ocorrência"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {fieldTranslations.map(({ field, translation, format }) => {
            const fieldValue = occurrence[field as keyof Occurrence];

            if (
              !fieldValue ||
              field === "image" ||
              field === "__v" ||
              field === "_id"
            ) {
              return null;
            }

            return (
              <p key={field}>
                <span className="font-bold">{translation}:</span>{" "}
                {format === "translateOccurrenceType"
                  ? handleTranslateOccurrenceType(String(fieldValue))
                  : format === "formatDate" && typeof fieldValue === "string"
                  ? formatDate(fieldValue)
                  : format === "formatStatus"
                  ? formatStatus(String(fieldValue))
                  : format === "formatAnonymous"
                  ? formatAnonymous(String(fieldValue))
                  : String(fieldValue)}
              </p>
            );
          })}
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="outline"
          disabled={loadingStatus}
          onClick={() => changeOccurrenceStatus()}
        >
          Alterar Status
        </Button>
        <Button
          variant="destructive"
          disabled={loadingDelete || loadingStatus}
          onClick={() => deleteOccurrence()}
        >
          Excluir denuncia
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
