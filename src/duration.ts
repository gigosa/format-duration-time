import Formatter from './formatter';

export default class Duration {
  static readonly INPUT_TYPES = [
    {
      unit: 'S',
      millisecondValue: 1,
    },
    {
      unit: 's',
      millisecondValue: 1000,
    },
    {
      unit: 'm',
      millisecondValue: 60000,
    },
    {
      unit: 'h',
      millisecondValue: 3600000,
    },
    {
      unit: 'd',
      millisecondValue: 86400000,
    },
  ];

  private _millisecond: number;

  constructor(private duration: number, private unit: string = 'S') {
    this._millisecond = this.convertToMillisecond();
  }

  get millisecond(): number {
    return this._millisecond;
  }

  set millisecond(millisecond: number) {
    this._millisecond = millisecond;
  }

  private convertToMillisecond(): number {
    const { millisecondValue } = Duration.INPUT_TYPES.filter(v => v.unit === this.unit)[0];
    return this.duration * millisecondValue;
  }

  public format(token: string, option: any = {}): string {
    const formatter = new Formatter(this, token, option);
    return formatter.format();
  }

  public add(value: number, unit: string = 'S') {
    const addDuration = new Duration(value, unit);
    addDuration.millisecond += this._millisecond;
    return addDuration;
  }

  public sub(value: number, unit: string = 'S') {
    const subDuration = new Duration(value, unit);
    subDuration.millisecond = this._millisecond - subDuration.millisecond;
    return subDuration;
  }
}
