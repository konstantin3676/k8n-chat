export type User = {
  access_token: string;
  expires_at: number;
};

export type UserSchema = {
  inited: boolean;
  authData?: User;
};
