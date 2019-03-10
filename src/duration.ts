import Formater from "./formater";

export default class Duration {
  static readonly FORMAT_TOKENS: RegExp = /\*?[Hh]|\*?m+|\*?s+|./g;
  static readonly INPUT_TYPES = [
    {
      type: 'ms',
      millisecondValue: 1
    },
    {
      type: 's',
      millisecondValue: 1000
    },
    {
      type: 'm',
      millisecondValue: 60000
    },
    {
      type: 'h',
      millisecondValue: 3600000
    }
  ];
  private _millisecond: number;

  constructor(private _duration: number, private _unit: string = 'ms') {
    this._millisecond = Duration.convertToMillisecond(_duration, _unit);
  }

  get millisecond(): number {
    return this._millisecond;
  }

  private static convertToMillisecond(value: number, type: string): number {
    let millisecondValue = Duration.INPUT_TYPES.filter(v => v.type === type)[0].millisecondValue;
    return value * millisecondValue;
  }

  public format(token: string): string {
    let formatter =  new Formater(this, token);
    return formatter.format();
  }
}