import { createSlice } from '@reduxjs/toolkit';

import { fetchModelOptions } from '../services/fetchModelOptions';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Settings, SettingsSchema } from '../types/settingsSchema';
const initialState: SettingsSchema = {
  settings: { model: '' },
  modelOptions: [],
  isLoading: false,
  error: undefined,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
    setInitModel: (state, action: PayloadAction<string>) => {
      if (!state.settings.model && action.payload) {
        state.settings.model = action.payload;
      }
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
