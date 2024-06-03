"use client";

import { handleTranslateOccurrenceType } from "@/app/utils/translate-occurrence-type";
import { format } from "date-fns";
import { Check, Clock, FolderOpen, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import InfosModal from "../InfosModal";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "../ui/use-toast";

interface Occurrence {
  _id: string;
  description: string;
  occurrence_type: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export default function OccurrencesTable() {
  const rowsPerPage = 5;
  const [data, setData] = useState<Occurrence[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalOccurrences, setTotalOccurrences] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState<
    string | null
  >(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/occurrences?page=${currentPage}&limit=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setData(data.occurrences);
      setTotalPages(data.pagination.totalPages);
      setTotalOccurrences(data.pagination.totalOccurrences);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar ocorrências: ", error);
      setIsLoading(false);
    }
  };

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

  const deleteOccurrence = async () => {
    if (!selectedOccurrenceId) return;

    setLoadingDelete(true);
    try {
      const response = await fetch(
        `/api/occurrences?id=${selectedOccurrenceId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      toast({
        title: "Ocorrência excluída com sucesso",
        description: "A ocorrência foi excluída com sucesso",
        variant: "destructive",
      });

      setLoadingDelete(false);
      setIsModalOpen(false);
      setSelectedOccurrenceId(null);
      getData();
    } catch (error) {
      console.error("Erro ao excluir ocorrência: ", error);
      setLoadingDelete(false);
      setIsModalOpen(false);
      setSelectedOccurrenceId(null);
      toast({
        title: "Erro ao excluir ocorrência",
        description: "Ocorreu um erro ao excluir a ocorrência",
        variant: "destructive",
      });
    }
  };

  const changeOccurrenceStatus = async () => {
    if (!selectedOccurrenceId) return;

    setLoadingStatus(true);
    try {
      const response = await fetch(
        `/api/occurrences?id=${selectedOccurrenceId}`,
        {
          method: "PATCH",
        }
      );
      const data = await response.json();

      toast({
        title: "Status alterado com sucesso",
        description: "O status da ocorrência foi alterado com sucesso",
      });

      setLoadingStatus(false);
      setIsModalOpen(false);
      setSelectedOccurrenceId(null);
      getData();
    } catch (error) {
      console.error("Erro ao altera o status da ocorrência: ", error);
      setLoadingStatus(false);
      setIsModalOpen(false);
      setSelectedOccurrenceId(null);
      toast({
        title: "Erro ao alterar o status da ocorrência",
        description: "Ocorreu um erro ao alterar o status da ocorrência",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return isLoading ? (
    <div className="flex min-h-12 justify-center flex-col">
      <Loader2 className="m-auto animate-spin" />
    </div>
  ) : (
    <>
      <Table className="min-h-12" title="Todas as ocorrências">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Tipo</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead className="text-center">Abrir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 &&
            data.map((item) => {
              const limitedDescription =
                item?.description.length > 20
                  ? `${item?.description.slice(0, 20)}...`
                  : item.description;
              return (
                <TableRow key={item._id}>
                  <TableCell className="text-left w-[200px]">
                    {handleTranslateOccurrenceType(item.occurrence_type)}
                  </TableCell>
                  <TableCell className="text-left">
                    {limitedDescription}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatStatus(item.status)}
                  </TableCell>
                  <TableCell className="text-left">
                    {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedOccurrenceId(item._id);
                        setIsModalOpen(true);
                      }}
                    >
                      <FolderOpen />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              title="Anterior"
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <div className="w-full text-sm">
              Página {currentPage} / {totalPages} - Total de Denúncias:{" "}
              {totalOccurrences}
            </div>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                currentPage + 1 > totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                setCurrentPage(
                  currentPage + 1 > totalPages ? totalPages : currentPage + 1
                );
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {selectedOccurrenceId && (
          <InfosModal
            occurrenceId={selectedOccurrenceId}
            setIsModalOpen={setIsModalOpen}
            getAllOccurrences={getData}
            deleteOccurrence={deleteOccurrence}
            changeOccurrenceStatus={changeOccurrenceStatus}
            loadingDelete={loadingDelete}
            loadingStatus={loadingStatus}
          />
        )}
      </Dialog>
    </>
  );
}
