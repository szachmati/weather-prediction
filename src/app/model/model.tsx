export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
