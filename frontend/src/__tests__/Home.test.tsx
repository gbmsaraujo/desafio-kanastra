// src/__tests__/Home.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "@/pages/Home";
import { FileProvider } from "@/components/ui/file/FileProvider";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";


// jest.mock("axios");

// describe("Home Component", () => {
//   it("should handle file upload", async () => {
//     render(
//       <MemoryRouter>
//         <FileProvider>
//           <Home />
//         </FileProvider>
//       </MemoryRouter>
//     );

//     const mockFile = new File(["file content"], "testfile.txt", {
//       type: "text/plain",
//     });

//     const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
//     fireEvent.change(input, { target: { files: [mockFile] } });

//     await waitFor(() => {
//       expect(screen.getByText("Name: testfile.txt")).toBeInTheDocument();
//       expect(screen.getByText("Type: text/plain")).toBeInTheDocument();
//       expect(screen.getByText(/Size:/i)).toBeInTheDocument();
//     });
//   });

//   it("should send the file on button click", async () => {
//     render(
//       <MemoryRouter>
//         <FileProvider>
//           <Home />
//         </FileProvider>
//       </MemoryRouter>
//     );

//     const mockFile = new File(["file content"], "testfile.txt", {
//       type: "text/plain",
//     });

//     const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
//     fireEvent.change(input, { target: { files: [mockFile] } });

//     const sendFileButton = screen.getByRole("button", {
//       name: /Upload the file/i,
//     });
//     fireEvent.click(sendFileButton);

//     await waitFor(() => {
//       expect(axios.post).toHaveBeenCalledWith(
//         "http://localhost:5000/upload",
//         expect.any(FormData),
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     });
//   });

//   it("should handle successful file upload", async () => {
//     (axios.post as jest.Mock).mockResolvedValue({
//       data: { status_code: 200, message: "Upload successful" },
//     });

//     render(
//       <MemoryRouter>
//         <FileProvider>
//           <Home />
//         </FileProvider>
//       </MemoryRouter>
//     );

//     const mockFile = new File(["file content"], "testfile.txt", {
//       type: "text/plain",
//     });

//     const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
//     fireEvent.change(input, { target: { files: [mockFile] } });

//     const sendFileButton = screen.getByRole("button", {
//       name: /Upload the file/i,
//     });
//     fireEvent.click(sendFileButton);

//     await waitFor(() => {
//       expect(alert).toHaveBeenCalledWith("Upload successful");
//     });
//   });

//   // it("should handle file upload failure", async () => {
//   //   (axios.post as jest.Mock).mockResolvedValue({
//   //     response: { data: { message: "Upload failed" } },
//   //   });

//   //   render(
//   //     <MemoryRouter>
//   //       <FileProvider>
//   //         <Home />
//   //       </FileProvider>
//   //     </MemoryRouter>
//   //   );

//   //   const mockFile = null;

//   //   const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
//   //   fireEvent.change(input, { target: { files: [mockFile] } });

//   //   const sendFileButton = screen.getByRole("button", {
//   //     name: /Upload the file/i,
//   //   });
//   //   fireEvent.click(sendFileButton);

//   //   await waitFor(() => {
//   //     expect(alert).toHaveBeenCalledWith("Upload failed");
//   //   });
//   // });
// });


jest.mock("axios");

describe("Home Component", () => {
  // Teste para verificar se o componente lida corretamente com o carregamento de um arquivo
  it("should handle file upload", async () => {
    // Renderiza o componente Home dentro de um MemoryRouter e FileProvider
    render(
      <MemoryRouter>
        <FileProvider>
          <Home />
        </FileProvider>
      </MemoryRouter>
    );

    // Cria um arquivo de mock para simular o carregamento
    const mockFile = new File(["file content"], "testfile.txt", {
      type: "text/plain",
    });

    // Seleciona o input de arquivo e simula a mudança para adicionar o arquivo
    const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    // Aguarda a exibição das informações do arquivo na tela
    await waitFor(() => {
      expect(screen.getByText("Name: testfile.txt")).toBeInTheDocument();
      expect(screen.getByText("Type: text/plain")).toBeInTheDocument();
      expect(screen.getByText(/Size:/i)).toBeInTheDocument();
    });
  });

  // Teste para verificar se o componente envia corretamente o arquivo quando o botão de envio é clicado
  it("should send the file on button click", async () => {
    // Renderiza o componente Home dentro de um MemoryRouter e FileProvider
    render(
      <MemoryRouter>
        <FileProvider>
          <Home />
        </FileProvider>
      </MemoryRouter>
    );

    // Cria um arquivo de mock para simular o carregamento
    const mockFile = new File(["file content"], "testfile.txt", {
      type: "text/plain",
    });

    // Seleciona o input de arquivo e simula a mudança para adicionar o arquivo
    const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    // Seleciona e clica no botão de envio
    const sendFileButton = screen.getByRole("button", {
      name: /Upload the file/i,
    });
    fireEvent.click(sendFileButton);

    // Aguarda o Axios ser chamado com os parâmetros corretos
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/upload",
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    });
  });

  // Teste para verificar se o componente lida corretamente com um upload de arquivo bem-sucedido
  it("should handle successful file upload", async () => {
    // Mock do Axios para simular uma resposta bem-sucedida
    (axios.post as jest.Mock).mockResolvedValue({
      data: { status_code: 200, message: "Upload successful" },
    });

    // Renderiza o componente Home dentro de um MemoryRouter e FileProvider
    render(
      <MemoryRouter>
        <FileProvider>
          <Home />
        </FileProvider>
      </MemoryRouter>
    );

    // Cria um arquivo de mock para simular o carregamento
    const mockFile = new File(["file content"], "testfile.txt", {
      type: "text/plain",
    });

    // Seleciona o input de arquivo e simula a mudança para adicionar o arquivo
    const input = screen.getByLabelText(/Choose a file/i) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [mockFile] } });

    // Seleciona e clica no botão de envio
    const sendFileButton = screen.getByRole("button", {
      name: /Upload the file/i,
    });
    fireEvent.click(sendFileButton);

    // Aguarda o alerta de sucesso ser exibido
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith("Upload successful");
    });
  });

  // Teste para verificar se o componente lida corretamente com um upload de arquivo com falha
  // (comentado devido à implementação incompleta ou problema na implementação)
  // it("should handle file upload failure", async () => {
  //   (axios.post as jest.Mock).mockResolvedValue({
  //     response: { data: { message: "Upload failed" } },
  //   });

  //   // Restante do teste...
  // });
});
