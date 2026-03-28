export type ApiKeyScope =
  | 'GIGACHAT_API_PERS'
  | 'GIGACHAT_API_B2B'
  | 'GIGACHAT_API_CORP';

export type User = {
  apiKey: string;
  apiKeyScope: ApiKeyScope;
  username?: string;
};

export type UserSchema = {
  inited: boolean;
  authData?: User;
};
