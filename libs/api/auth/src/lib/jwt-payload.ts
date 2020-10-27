import { UserRole } from '@post-rest-api/models';

export interface JwtPayload {
  email: string;
  username: string;
  role: UserRole;
}
