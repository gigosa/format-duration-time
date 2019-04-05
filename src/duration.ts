import Formater from './formater';

export default class Duration {
  static readonly FORMAT_TOKENS: RegExp = /\*?[Hh]|\*?m+|\*?s+|./g;

  static readonly INPUT_TYPES = [
    {
      type: 'S',
      millisecondValue: 1,
    },
    {
      type: 's',
      millisecondValue: 1000,
    },
    {
      type: 'm',
      millisecondValue: 60000,
    },
    {
      type: 'h',
      millisecondValue: 3600000,
    },
  ];

  private _millisecond: number;

  constructor(private duration: number, private unit: string = 'S') {
    this._millisecond = Duration.convertToMillisecond(duration, unit);
  }

  get millisecond(): number {
    return this._millisecond;
  }

  private static convertToMillisecond(value: number, type: string): number {
    const { millisecondValue } = Duration.INPUT_TYPES.filter(v => v.type === type)[0];
    return value * millisecondValue;
  }

  public format(token: string, option: any = {}): string {
    const formatter = new Formater(this, token, option);
    return formatter.format();
  }
}
