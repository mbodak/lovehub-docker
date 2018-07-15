export class UserProfile {

  id: number;
  firstName: string;
  lastName: string;
  numberLike: number;
  age: number;
  sex: string;
  preference: string;
  orientation: string;
  isBaned: boolean;
  isActive: boolean;
  avatar: string;
  userId: number;
  role: string;
  phoneNumber: number;

  constructor(id: number = 0,
              firstName: string = '',
              lastName: string = '',
              age: number = 0,
              sex: string = '',
              orientation: string = '',
              preference: string = '',
              avatar: string = null,
              role: string = 'USER',
              phoneNumber: number = 1) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.sex = sex;
    this.orientation = orientation;
    this.preference = preference;
    this.avatar = avatar;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }
}
