interface Role {
  id: number;
  name: string;
}

interface Authority {
  authority: string;
}

export default interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  roles: Array<Role>;
  enabled: boolean;
  authorities: Array<Authority>;
  username: string;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
}
