export default class Duration {
  static readonly FORMAT_TOKENS: RegExp = /\*?[Hh]|\*?m+|\*?s+|./g;
  static readonly INPUT_TYPES = [
    {
      type: 's',
      millisecondValue: 1000
    }
  ];
  private formatTokenFunctions: {[key: string]: Function};
  private formatFunctions: {[key: string]: Function};
  private hour: number = 0;
  private minute: number = 0;
  private second: number = 0;
  private millisecond: number;

  constructor(private duration: number, private unit: string = 's') {
    this.formatTokenFunctions = {};
    this.formatFunctions = {};
    this.millisecond = Duration.convertToMillisecond(duration, unit);
    this.addFormatToken('s', 0, this.getSecond);
    this.addFormatToken('h', 0, this.getHour);
    this.addFormatToken('m', 0, this.getMinute);
    this.addFormatToken('mm', 2, this.getMinute);
  }

  private static convertToMillisecond(value: number, type: string): number {
    let millisecondValue = Duration.INPUT_TYPES.filter(v => v.type === type)[0].millisecondValue;
    return value * millisecondValue;
  }

  public getHour = (duration: number): number => {
    this.hour = Math.floor(duration / 3600000);
    return this.hour;
  }

  private getMinute = (duration: number): number => {
    this.minute = Math.floor((duration - this.hour * 3600000) / 60000);
    return this.minute;
  }

  private getSecond = (duration: number): number => {
    this.second = Math.floor((duration - this.hour * 3600000
      - this.minute * 60000) / 1000);
    return this.second;
  }

  private static zeroPad(value: number, length: number): string{
    let s = String(value);
    if (s.length >= length) return s;
    while (s.length < length) s = '0' + s;
    return s;
  }

  private addFormatToken(token: string, pad: number, callback: Function): void {
    let func = callback;
    this.formatTokenFunctions[token] = (duration: number) => Duration.zeroPad(func(duration), pad);
  }

  private makeFormatFunction(format: string): Function {
    let matched: Array<string>|null = format.match(Duration.FORMAT_TOKENS);
    if (matched === null) return () => {};
    let functionArray: Array<Function|string> = [];
    for (let token of matched) {
      if (this.formatTokenFunctions[token]) {
        functionArray.push(this.formatTokenFunctions[token]);
      } else {
        functionArray.push(token);
      }
    }
    return (duration: number): string => {
      let output = '';
      for (let func of functionArray) {
        if (typeof func === 'function') {
          output += func(duration);
        } else {
          output += func;
        }
      }
      return output;
    }
  }

  public format(format: string): string {
    // TODO: 0になった桁を表示するかしないかのオプションを受け取れるようにする
    this.formatFunctions[format] = this.makeFormatFunction(format);
    return this.formatFunctions[format](this.millisecond);
  }
}