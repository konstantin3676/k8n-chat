export type User = {
  apiKey: string;
  username?: string;
};

export type UserSchema = {
  inited: boolean;
  authData?: User;
};
