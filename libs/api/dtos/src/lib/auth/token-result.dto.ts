import { UserInformationDto } from '@post-rest/api/dtos';
import addMilliseconds from 'date-fns/addMilliseconds';
import parse from 'date-fns/parse';
import ms from 'ms';

export class TokenResultDto {
  token: string;
  tokenExpiry: Date;
  user: UserInformationDto;

  computeExpiry(expired: string) {
    const milli = ms(expired);
    const now = Date.now();
    this.tokenExpiry = parse(
      addMilliseconds(now, milli).toLocaleString(),
      'M/d/yyyy, h:mm:ss aaa',
      now
    );
  }
}
