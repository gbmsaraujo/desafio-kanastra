import { ChangeEvent } from "react";

type FileUploaderProps = {
  file: Partial<File> | undefined;
  onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
  onSendFile: () => void;
};

const FileUploader = ({
  file,
  onUploadFile,
  onSendFile,
}: FileUploaderProps) => {
  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    onUploadFile(event);
  }

  return (
    <div className="flex flex-col gap-6 p-2">
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input
          id="file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          onChange={handleFile}
        />
      </div>

      <section>
        <p className="pb-6">File details:</p>
        <ul>
          <li>Name: {file?.name}</li>
          <li>Type: {file?.type}</li>
          <li>Size: {file?.size} bytes</li>
        </ul>
      </section>

      {file && (
        <div className="flex justify-center">
          <button
            className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold w-80"
            onClick={onSendFile}
          >
            Upload the file
          </button>
        </div>
      )}
    </div>
  );
};

export { FileUploader };
