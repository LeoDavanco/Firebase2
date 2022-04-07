export enum AuthProvider {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Email,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Facebook
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface User {
  name?: string;
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthOptions {
  isSignIn: boolean;
  provider: AuthProvider;
  user: User;
}

