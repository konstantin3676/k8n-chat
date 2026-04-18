import { SETTINGS_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { createSlice } from '@reduxjs/toolkit';

import { fetchModelOptions } from '../services/fetchModelOptions';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { Settings, SettingsSchema } from '../types/settingsSchema';
const saveSettingsToLocalStorage = (state: SettingsSchema) => {
  localStorage.setItem(
    SETTINGS_LOCALSTORAGE_KEY,
    JSON.stringify(state.settings),
  );
};

const initialState: () => SettingsSchema = () => {
  let settings = { model: '' };
  const settingsDataString = localStorage.getItem(SETTINGS_LOCALSTORAGE_KEY);

  if (settingsDataString) {
    try {
      const settingsData = JSON.parse(
        settingsDataString,
      ) as SettingsSchema['settings'];
      if (settingsData) {
        settings = settingsData;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return {
    settings,
    modelOptions: [],
    isLoading: false,
    error: undefined,
  };
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
      saveSettingsToLocalStorage(state);
    },
    setInitModel: (state, action: PayloadAction<string>) => {
      if (!state.settings.model && action.payload) {
        state.settings.model = action.payload;
        saveSettingsToLocalStorage(state);
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
