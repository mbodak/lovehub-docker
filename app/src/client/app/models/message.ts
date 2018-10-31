export default class Message {
  read: boolean;
  
  constructor(
    private userId: number,
    private text: string,
    private _id: string,
    read: boolean,
    private created: Date) {
      this.read = read;
    }
}
