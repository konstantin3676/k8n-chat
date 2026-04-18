import type { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ModelOptionsResponse } from '../types/settingsSchema';

export const fetchModelOptions = createAsyncThunk<
  ModelOptionsResponse,
  undefined,
  ThunkConfig<string>
>(
  'settings/fetchModelOptions',
  async (_, { getState, rejectWithValue, extra }) => {
    const state = getState();
    const authData = state.user.authData;

    try {
      const { data } = await extra.api.get<ModelOptionsResponse>('/models', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authData?.access_token}`,
        },
      });

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
