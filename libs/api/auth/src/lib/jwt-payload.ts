import { UserRole } from '@post-rest/api/user';

export interface JwtPayload {
  email: string;
  username: string;
  role: UserRole;
}
