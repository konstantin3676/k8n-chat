import type { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginPassword = (state: StateSchema) => state.login.password;
export const getLoginScope = (state: StateSchema) => state.login.scope;
export const getLoginError = (state: StateSchema) => state.login.error;
