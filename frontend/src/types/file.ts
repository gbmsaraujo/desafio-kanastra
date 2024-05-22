import { ReactNode } from "react";

export enum FileActionType {
  GET_HISTORICS = "GET_HISTORICS",
  UPLOAD_START = "UPLOAD_START",
  UPLOAD_SUCCESS = "UPLOAD_SUCCESS",
  UPLOAD_FAILURE = "UPLOAD_FAILURE",
  UPLOAD_SENDED = "UPLOAD_SENDED",
}

type ReducerAction<T, P> = {
  type: T;
  payload?: P;
};

export interface HistoricItem {
  created_at: string;
  filename: string;
  id: string;
}

export interface AxiosResponseData {
  message: string;
  response?: HistoricItem[] | undefined;
  status_code: number;
}

type FileContextState = {
  isLoading?: boolean;
  file?: File | undefined;
  error?: string | null;
  filename?: string | undefined;
  files?: Array<HistoricItem> | undefined;
};

type FileAction = ReducerAction<FileActionType, FileContextState>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: ReactNode };

export type {
  FileContextState,
  FileAction,
  FileDispatch,
  FileContextType,
  FileProviderProps,
};
