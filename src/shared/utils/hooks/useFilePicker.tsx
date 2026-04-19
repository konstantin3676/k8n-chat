import { useCallback, useRef, useState } from 'react';

type Props = {
  onSelect: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  allowedTypes?: string[];
};

export const useFilePicker = ({
  onSelect,
  accept = '',
  multiple = false,
  maxSize = Infinity,
  allowedTypes = [],
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const open = useCallback(() => {
    setValidationError(null);
    inputRef.current?.click();
  }, []);

  const reset = useCallback(() => {
    setFiles([]);
    setValidationError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files ?? []);
      setValidationError(null);

      if (selectedFiles.length === 0) return;

      for (const file of selectedFiles) {
        if (file.size > maxSize) {
          setValidationError(`Файл "${file.name}" превышает допустимый размер`);
          return;
        }
        if (allowedTypes.length && !allowedTypes.includes(file.type)) {
          setValidationError(`Файл "${file.name}" имеет неподдерживаемый тип`);
          return;
        }
      }

      setFiles(selectedFiles);
      onSelect(selectedFiles);
    },
    [allowedTypes, maxSize, onSelect],
  );

  const InputComponent = () => (
    <input
      type="file"
      ref={inputRef}
      multiple={multiple}
      accept={accept}
      onChange={handleChange}
      style={{ display: 'none' }}
    />
  );

  return {
    files,
    validationError,
    open,
    reset,
    InputComponent,
  };
};
