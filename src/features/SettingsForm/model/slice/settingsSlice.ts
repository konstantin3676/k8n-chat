import { createSlice } from '@reduxjs/toolkit';

import { fetchModelOptions } from '../services/fetchModelOptions';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Model, SettingsSchema } from '../types/settingsSchema';
const initialState: SettingsSchema = {
  modelOptions: [],
  isLoading: false,
  model: '',
  temperature: '',
  topP: '',
  maxTokens: '',
  repetitionPenalty: '',
  error: undefined,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<Model['id']>) => {
      state.model = action.payload;
    },
    setTemperature: (state, action: PayloadAction<string>) => {
      state.temperature = action.payload;
    },
    setTopP: (state, action: PayloadAction<string>) => {
      state.topP = action.payload;
    },
    setMaxTokens: (state, action: PayloadAction<string>) => {
      state.maxTokens = action.payload;
    },
    setRepetitionPenalty: (state, action: PayloadAction<string>) => {
      state.repetitionPenalty = action.payload;
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
