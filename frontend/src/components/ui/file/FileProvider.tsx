import { useReducer } from "react";
import FileContext from "./FileContext";
import { FileProviderProps, FileContextState } from "@/types";
import { FileContextInitialValues, FileReducer } from "../file/FileReducer";

export const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState
  );


  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};


