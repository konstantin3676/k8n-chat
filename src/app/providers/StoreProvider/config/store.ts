import { chatReducer } from '@/entities/Chat';
import { userReducer } from '@/entities/User';
import { loginReducer } from '@/features/AuthByApiKey';
import { filesUploadReducer, streamingReducer } from '@/features/InputArea';
import { settingsReducer } from '@/features/SettingsForm';
import { api } from '@/shared/api/api';
import { configureStore } from '@reduxjs/toolkit';

import type { Action, ThunkAction } from '@reduxjs/toolkit';

import type { ThunkExtraArg } from './StateSchema';
const extraArg: ThunkExtraArg = {
  api,
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    streaming: streamingReducer,
    chat: chatReducer,
    settings: settingsReducer,
    filesUpload: filesUploadReducer,
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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  ThunkExtraArg,
  Action<string>
>;
