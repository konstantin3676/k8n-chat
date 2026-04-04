import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByApiKey';
import { api } from '@/shared/api/api';
import { configureStore } from '@reduxjs/toolkit';

import type { ThunkExtraArg } from './StateSchema';
const extraArg: ThunkExtraArg = {
  api,
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
