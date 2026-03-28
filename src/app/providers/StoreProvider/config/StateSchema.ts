import type { UserSchema } from '@/entities/User';
import type { AxiosInstance } from 'axios';

export type StateSchema = {
  user: UserSchema;
};

export type ThunkExtraArg = {
  api: AxiosInstance;
};

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
