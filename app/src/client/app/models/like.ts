export class Like {
  whoLike: number;
  whatLike: number;

  constructor(whoLike: number = -1,
              whatLike: number = -1) {
    this.whoLike = whoLike;
    this.whatLike = whatLike;
  }
}
