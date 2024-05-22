import { FileUploader } from "@/components";

import { FileActionType } from "@/types";
import { ChangeEvent } from "react";
import axios from "axios";
import { Loader } from "@/components/ui/loader";
import Header from "@/components/ui/header";
import { useFileContext } from "@/components/ui/file/useFileContext";



export default function Home() {
  const { state, dispatch } = useFileContext();

  function handleFile(file: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: FileActionType.UPLOAD_START,
      payload: {
        file: file.target.files?.[0],
        filename: file.target.files?.[0].name,
      },
    });
  }

  async function SendFile() {
    if (!state.file?.size) {
      alert("Nenhum arquivo selecionado!");
      return;
    }

    const formData = new FormData();
    formData.append("file", state.file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: FileActionType.UPLOAD_SENDED,
        payload: {
          ...state,
          isLoading: true,
        },
      });

      if (response.data.status_code === 200) {
        alert(response.data.message);
        dispatch({
          type: FileActionType.UPLOAD_SUCCESS,
          payload: {
            ...state,
            isLoading: false,
            file: undefined,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: FileActionType.UPLOAD_FAILURE,
        payload: {
          ...state,
          error: error,
        },
      });
      alert(state.error);
    }
  }

  return (
    <>
      <Header />
      <section>
        <h2 className="text-center m-4 text-xl">
          Kanastra - Upload de Arquivos
        </h2>
        <FileUploader
          file={state.file}
          onUploadFile={handleFile}
          onSendFile={SendFile}
        />

        {state.isLoading && <Loader />}
      </section>
    </>
  );
}
