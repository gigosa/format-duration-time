export default class Duration {
  static readonly FORMAT_TOKENS: RegExp = /\*?[Hh]|\*?m+|\*?s+|./g;
  private formatTokenFunctions: {[key: string]: Function};
  private formatFunctions: {[key: string]: Function};

  constructor(private duration: number, private unit: string = 's') {
    this.formatTokenFunctions = {};
    this.formatFunctions = {};
    this.addFormatToken('h', 0, Duration.getHour);
    this.addFormatToken('m', 0, Duration.getMinute);
    this.addFormatToken('mm', 2, Duration.getMinute);
  }

  private static getHour(duration: number): number {
    return Math.floor(duration / 3600);
  }

  private static getMinute(duration: number): number {
    return Math.floor(duration % 3600 / 60);
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
    return this.formatFunctions[format](this.duration);
  }
}