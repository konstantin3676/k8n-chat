export type ApiKeyScope =
  | 'GIGACHAT_API_PERS'
  | 'GIGACHAT_API_B2B'
  | 'GIGACHAT_API_CORP';

export type LoginSchema = {
  password: string;
  scope: ApiKeyScope;
  isLoading: boolean;
  error: string | null;
};
