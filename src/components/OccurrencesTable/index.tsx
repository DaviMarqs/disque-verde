"use client";

import { format } from "date-fns";
import { Check, Clock, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
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

interface Occurrence {
  id: string;
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

  const getData = async () => {
    try {
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
    } catch (error) {
      console.error("Erro ao buscar ocorrências: ", error);
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

  const translateType = (type: string) => {
    switch (type) {
      case "BURNED":
        return "Queimada";
      case "TRASH":
        return "Lixo em lugar inapropriado";
      case "VANDALISM":
        return "Vandalismo Ambiental";
      case "INVASION":
        return "Invasão";
      case "OTHER":
        return "Outros";
      default:
        return type;
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
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
                <>
                  <TableRow>
                    <TableCell className="text-left w-[200px]">
                      {translateType(item.occurrence_type)}
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
                      <Button variant="outline">
                        <FolderOpen />
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
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
    </>
  );
}
