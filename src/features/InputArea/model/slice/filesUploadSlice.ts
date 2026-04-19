import { createSlice } from '@reduxjs/toolkit';

import { uploadFiles } from '../services/uploadFiles';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { FilesUploadSchema } from '../types/filesUpload';
const initialState: FilesUploadSchema = {
  status: 'idle',
  progress: 0,
  error: null,
};

export const filesUploadSlice = createSlice({
  name: 'filesUpload',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = Math.min(100, action.payload);
    },
    resetUpload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.status = 'uploading';
        state.progress = 0;
        state.error = null;
      })
      .addCase(uploadFiles.fulfilled, (state) => {
        state.status = 'success';
        state.progress = 100;
      })
      .addCase(uploadFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка сети';
      });
  },
});

export const { actions: filesUploadActions } = filesUploadSlice;
export const { reducer: filesUploadReducer } = filesUploadSlice;
