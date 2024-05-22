import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";
import { useFileContext } from "@/components/ui/file/useFileContext";

import Header from "@/components/ui/header";
import { AxiosResponseData, FileActionType } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";

export default function ListFiles() {
  const { state, dispatch } = useFileContext();

  useEffect(() => {
    async function getHistorics() {
      try {
        const response: AxiosResponse<AxiosResponseData> = await axios.get(
          "http://localhost:5000//historics"
        );

        console.log(response);
        dispatch({
          type: FileActionType.GET_HISTORICS,
          payload: { files: response.data.response },
        });
      } catch (err: any) {
        alert(err.response.data.message);
      }
    }
    getHistorics();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <h1 className="text-center m-6 font-semibold">Histórico de Arquivos</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Arquivo</TableHead>
            <TableHead>Data de Criação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.files &&
            state.files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.filename}</TableCell>
                <TableCell>{file.created_at}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              Total de Arquivos: {state.files?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
