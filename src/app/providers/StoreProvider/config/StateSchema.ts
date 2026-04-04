import type { UserSchema } from '@/entities/User';
import type { LoginSchema } from '@/features/AuthByApiKey';
import type { AxiosInstance } from 'axios';

export type StateSchema = {
  user: UserSchema;
  login: LoginSchema;
};

export type ThunkExtraArg = {
  api: AxiosInstance;
};

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
