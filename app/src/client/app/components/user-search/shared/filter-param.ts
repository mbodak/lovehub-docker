export class FilterParam {

  constructor(
    private _label: string,
    private _type: string,
    private _name: string,
    private _value: string,
    private _placeholder?: string
  ) {}

  public get label(): string {
    return this._label;
  }

  public set label(value: string) {
    this._label = value;
  }

  public get type(): string {
    return this._type;
  }

  public set type(value: string) {
    this._type = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
  }

  public get placeholder(): string {
    return this._placeholder;
  }

  public set placeholder(value: string) {
    this._placeholder = value;
  }
}
