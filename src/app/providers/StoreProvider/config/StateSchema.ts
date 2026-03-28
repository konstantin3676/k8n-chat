export type StateSchema = {};

import type { AxiosInstance } from 'axios';

export type ThunkExtraArg = {
  api: AxiosInstance;
};

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
