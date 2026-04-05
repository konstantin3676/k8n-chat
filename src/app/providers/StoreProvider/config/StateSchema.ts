import type { ChatSchema } from '@/entities/Chat';
import type { UserSchema } from '@/entities/User';
import type { LoginSchema } from '@/features/AuthByApiKey';
import type { StreamingSchema } from '@/features/InputArea';
import type { AxiosInstance } from 'axios';

export type StateSchema = {
  user: UserSchema;
  login: LoginSchema;
  streaming: StreamingSchema;
  chat: ChatSchema;
};

export type ThunkExtraArg = {
  api: AxiosInstance;
};

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
