import { SEX } from '../sex';
import { ORIENTATION } from '../orientation';
import { PREFERENCE } from '../preference';
import { ROLE } from '../role';

export class UserProfileDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: number;
  readonly age?: number;
  readonly sex?: SEX;
  readonly role?: ROLE;
  readonly preference?: PREFERENCE;
  readonly orientation?: ORIENTATION;
  readonly userId?: number;
  readonly isBaned?: boolean;
  readonly isActive?: boolean;
  readonly registrationDate?: number;
  readonly lastActiveDate?: number;
}
