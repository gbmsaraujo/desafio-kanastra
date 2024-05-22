import { FileContextState, FileAction, FileActionType } from "@/types";

export const FileContextInitialValues: FileContextState = {
  file: undefined,
  isLoading: false,
  error: "",
  filename: "",
  files: []
};

export const FileReducer = (
  state: FileContextState,
  action: FileAction
): FileContextState => {
  switch (action.type) {
    case FileActionType.UPLOAD_START:
      return {
        ...state,
        isLoading: false,
        error: null,
        file: action.payload?.file,
      }
    case FileActionType.UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        file: action.payload?.file,
        filename: action.payload?.filename,
        error: null,
      };
    case FileActionType.UPLOAD_SENDED:
      return {
        ...state,
        isLoading: false,
        file: action.payload?.file,
        filename: action.payload?.filename,
        error: null,
      };
    case FileActionType.UPLOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload?.error || null,
      };
    case FileActionType.GET_HISTORICS:
      return {
        ...state,
        files: action.payload?.files,
        isLoading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
