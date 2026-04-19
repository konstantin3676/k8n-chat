import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { filesUploadActions } from '../slice/filesUploadSlice';

import type { FilesUploadResponse } from '../types/filesUpload';
export const uploadFiles = createAsyncThunk<
  FilesUploadResponse,
  File[],
  ThunkConfig<string>
>(
  'filesUpload/uploadFiles',
  async (files, { dispatch, getState, rejectWithValue, extra }) => {
    const state = getState();
    const authData = state.user.authData;
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    formData.append('purpose', 'general');

    try {
      const { data } = await extra.api.post<FilesUploadResponse>(
        '/files',
        formData,
        {
          headers: {
            Authorization: `Bearer ${authData?.access_token}`,
          },
          onUploadProgress: (e) => {
            if (e.total) {
              const percent = Math.round((e.loaded * 100) / e.total);
              dispatch(filesUploadActions.setProgress(percent));
            }
          },
        },
      );

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (e) {
      return rejectWithValue(
        e instanceof AxiosError && e.response?.data?.message
          ? e.response.data.message
          : 'Unknown error',
      );
    }
  },
);
