import { Injectable } from '@nestjs/common';
import dayjs from "../common/dayjs.util"
@Injectable()
export class HelpersService {
  timeUntilMidnight(date: Date) {
    const now = dayjs();
    const midnight = dayjs(date).endOf('day');
    return midnight.diff(now, 'second');
  }
}