export class CreatePhotoDto {
  readonly userId: number;
  readonly name: string;
  readonly base64: string;
  readonly avatar: boolean;
}
