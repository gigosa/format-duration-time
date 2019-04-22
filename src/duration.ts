import Formater from './formater';

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

  private convertToMillisecond(): number {
    const { millisecondValue } = Duration.INPUT_TYPES.filter(v => v.unit === this.unit)[0];
    return this.duration * millisecondValue;
  }

  public format(token: string, option: any = {}): string {
    const formatter = new Formater(this, token, option);
    return formatter.format();
  }
}
