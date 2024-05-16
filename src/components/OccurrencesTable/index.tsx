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
  occurrence_type?: string;
  image?: string;
  created_at: string;
  updated_at: string;
  status: string;
}

const fakeData: Occurrence[] = [
  {
    id: "1",
    description: "Queimada no centro da cidade",
    occurrence_type: "BURNED",
    image:
      "https://unsplash.com/pt-br/fotografias/fogo-com-fumaca-preta-durante-a-noite-gyrrWzwqm5Y",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
    status: "PENDING",
  },
  {
    id: "2",
    description: "Lixo na rua",
    occurrence_type: "TRASH",
    image:
      "https://unsplash.com/pt-br/fotografias/fogo-com-fumaca-preta-durante-a-noite-gyrrWzwqm5Y",
    created_at: "2023-01-01T00:00:00.000Z",
    updated_at: "2023-01-01T00:00:00.000Z",
    status: "CONCLUDED",
  },
];

export default function OccurrencesTable() {
  const rowsPerPage = 5;
  const [data, setData] = useState<Occurrence[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const getData = async () => {
    try {
      console.log("Data:", fakeData);
      setData(fakeData);
    } catch (error) {
      console.error("Erro ao buscar ocorrências: ", error);
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock color="orange" className="ml-2" />;
      case "CONCLUDED":
        return <Check color="green" className="ml-2"/>;
      default:
        return status;
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Table className="min-h-12" title="Todas as ocorrências">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead className="text-center">Abrir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const limitedDescription =
              item?.description.length > 20
                ? `${item?.description.slice(0, 20)}...`
                : item.description;
            return (
              <>
                <TableRow>
                  <TableCell className="text-left">{item.id}</TableCell>
                  <TableCell className="text-left">
                    {limitedDescription}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatStatus(item.status)}
                  </TableCell>
                  <TableCell className="text-left">
                    {format(new Date(item.created_at), "dd/MM/yyyy HH:mm")}
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
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                endIndex === 100 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage);
                setEndIndex(endIndex + rowsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
