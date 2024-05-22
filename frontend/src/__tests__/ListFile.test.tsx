
import { FileProvider } from "@/components/ui/file/FileProvider";
import ListFiles from "@/pages/ListFiles";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// Mock do módulo axios
jest.mock("axios");

describe("ListFile Component", () => {
  it("should render list of files correctly", async () => {
    // Mock do estado do contexto
    const mockContextValue = {
      state: {
        files: [
          { id: 1, filename: "file1.txt", created_at: "2024-05-20" },
          { id: 2, filename: "file2.txt", created_at: "2024-05-19" },
          { id: 3, filename: "file3.txt", created_at: "2024-05-18" },
        ],
      },
    };

    // Mock da resposta da requisição GET para /historics
    const mockResponse = {
      data: {
        response: mockContextValue.state.files,
      },
    };

    // Mock da implementação da função axios.get
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    // Renderiza o componente ListFile dentro do contexto do FileProvider
    render(
      <MemoryRouter>
        <FileProvider>
          <ListFiles />
        </FileProvider>
      </MemoryRouter>
    );

    // Aguarda a exibição da lista de arquivos
    await waitFor(() => {
      expect(screen.getByText("file1.txt")).toBeInTheDocument();
      expect(screen.getByText("file2.txt")).toBeInTheDocument();
      expect(screen.getByText("file3.txt")).toBeInTheDocument();
    });
  });

  it("should handle error in fetching files", async () => {

    // Mock da resposta da requisição GET para /historics
    const errorMessage = "Failed to fetch files";
    (axios.get as jest.Mock).mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    // Renderiza o componente ListFile dentro do contexto do FileProvider
    render(
      <MemoryRouter>
        <FileProvider>
          <ListFiles />
        </FileProvider>
      </MemoryRouter>
    );

    // Aguarda a exibição da mensagem de erro
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(errorMessage);
    });
  });
});
