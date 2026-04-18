import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { isValidAccessToken } from '@/shared/utils/isValidAccessToken';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { User, UserSchema } from '../types/user';
const initialState: UserSchema = {
  inited: false,
  authData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User | null>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (userData) {
        try {
          const user = JSON.parse(userData) as User;
          if (isValidAccessToken(user.expires_at)) {
            state.authData = user;
          } else {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
          }
        } catch (e) {
          console.log(e);
        }
      }
      state.inited = true;
    },
    logout: (state) => {
      state.authData = null;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
