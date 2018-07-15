export class Photo {
  _id: string;
  userId: number;
  name: string;
  base64: string;
  avatar: boolean;

  constructor(_id: string, userId: number, name: string, base64: string, avatar: boolean) {
    this._id = _id;
    this.userId = userId;
    this.name = name;
    this.base64 = base64;
    this.avatar = avatar;
  }
}
