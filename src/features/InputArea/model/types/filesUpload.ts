export type FilesUploadStatus = 'idle' | 'uploading' | 'success' | 'failed';

export type FilesUploadSchema = {
  status: FilesUploadStatus;
  progress: number;
  error: string | null;
};

export type FilesUploadResponse = {
  bytes: number;
  created_at: number;
  filename: string;
  id: string;
  object: string;
  purpose: 'general';
  access_policy: 'private' | 'public';
  modalities: string[];
};
