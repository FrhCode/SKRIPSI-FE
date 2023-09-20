/* eslint-disable no-unused-vars */
import { JWT } from "next-auth/jwt";

interface AuthResponse {
  userDetail: {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
    roles: Role[];
    authorities: any[]; // You can replace 'any' with the actual type if you have more information about this field
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
  };
  jwtToken: string;
}

interface Role {
  id: number;
  name: string;
}

declare module "next-auth" {
  interface Session extends AuthResponse {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AuthResponse["userDetail"];
    jwtToken: AuthResponse["jwtToken"];
  }
}
