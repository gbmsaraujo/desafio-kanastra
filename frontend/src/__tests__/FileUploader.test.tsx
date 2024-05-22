import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FileUploader } from "@/components";



describe("FileUploader", () => {
  const mockOnUploadFile = jest.fn();
  const mockOnSendFile = jest.fn();

  const file: Partial<File> = {
    name: "example.csv",
    type: "text/csv",
    size: 13,
  };

  beforeEach(() => {
    mockOnUploadFile.mockClear();
    mockOnSendFile.mockClear();
  });

  test("renders without crashing", () => {
    render(
      <FileUploader
        file={undefined}
        onUploadFile={mockOnUploadFile}
        onSendFile={mockOnSendFile}
      />
    );
    expect(screen.getByLabelText(/choose a file/i)).toBeInTheDocument();
  });

  test("displays file details when a file is provided", () => {
    render(
      <FileUploader
        file={file}
        onUploadFile={mockOnUploadFile}
        onSendFile={mockOnSendFile}
      />
    );
    expect(screen.getByText(/name: example.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/type: text\/csv/i)).toBeInTheDocument();
    expect(screen.getByText(/size: 13 bytes/i)).toBeInTheDocument();
  });

  test("calls onUploadFile when a file is selected", () => {
    render(
      <FileUploader
        file={undefined}
        onUploadFile={mockOnUploadFile}
        onSendFile={mockOnSendFile}
      />
    );
    const fileInput = screen.getByLabelText(
      /choose a file/i
    ) as HTMLInputElement;

    fireEvent.change(fileInput, {
      target: {
        files: [
          new File(["dummy content"], "example.csv", { type: "text/csv" }),
        ],
      },
    });

    expect(mockOnUploadFile).toHaveBeenCalledTimes(1);
  });

  test("calls onSendFile when the upload button is clicked", () => {
    render(
      <FileUploader
        file={file}
        onUploadFile={mockOnUploadFile}
        onSendFile={mockOnSendFile}
      />
    );
    const uploadButton = screen.getByText(/upload the file/i);

    fireEvent.click(uploadButton);

    expect(mockOnSendFile).toHaveBeenCalledTimes(1);
  });

  test("upload button is not rendered if no file is provided", () => {
    render(
      <FileUploader
        file={undefined}
        onUploadFile={mockOnUploadFile}
        onSendFile={mockOnSendFile}
      />
    );
    expect(screen.queryByText(/upload the file/i)).toBeNull();
  });
});
