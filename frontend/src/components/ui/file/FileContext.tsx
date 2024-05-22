import { createContext } from "react";
import { FileContextType } from "@/types";

const FileContext = createContext({
  state: {},
  dispatch: () => null,
} as FileContextType);

export default FileContext;
