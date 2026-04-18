import { createSlice } from '@reduxjs/toolkit';

import { fetchModelOptions } from '../services/fetchModelOptions';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Model, SettingsSchema } from '../types/settingsSchema';
const initialState: SettingsSchema = {
  modelOptions: [],
  isLoading: false,
  model: null,
  temperature: null,
  topP: null,
  maxTokens: null,
  repetitionPenalty: null,
  error: undefined,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<Model>) => {
      state.model = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModelOptions.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(fetchModelOptions.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.modelOptions = payload.data.filter(({ type }) => type === 'chat');
    });
    builder.addCase(fetchModelOptions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: settingsActions } = settingsSlice;
export const { reducer: settingsReducer } = settingsSlice;
