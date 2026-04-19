import { createSlice } from '@reduxjs/toolkit';

import { loginByApiKey } from '../services/loginByApiKey/loginByApiKey';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { ApiKeyScope, LoginSchema } from '../types/loginSchema';
const initialState: LoginSchema = {
  password: '',
  scope: 'GIGACHAT_API_PERS',
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setScope: (state, action: PayloadAction<ApiKeyScope>) => {
      state.scope = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByApiKey.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(loginByApiKey.fulfilled, (state) => {
      state.isLoading = false;
      state.password = '';
    });
    builder.addCase(loginByApiKey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
    });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
