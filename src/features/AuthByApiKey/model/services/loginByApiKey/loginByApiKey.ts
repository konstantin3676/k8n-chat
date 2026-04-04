import type { ThunkConfig } from '@/app/providers/StoreProvider';
import uuid4 from 'uuid4';

import { userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { User } from '@/entities/User';
import type { ApiKeyScope } from '../../types/loginSchema';
interface Props {
  password: string;
  scope: ApiKeyScope;
}

export const loginByApiKey = createAsyncThunk<User, Props, ThunkConfig<string>>(
  'login/loginByApiKey',
  async ({ password, scope }, { dispatch, rejectWithValue, extra }) => {
    try {
      const { data } = await extra.api.post<User>(
        '/api/v2/oauth',
        { scope },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
            RqUID: uuid4(),
            Authorization: `Basic ${password}`,
          },
        },
      );

      if (!data) {
        throw new Error();
      }

      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));

      dispatch(userActions.setAuthData(data));

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
