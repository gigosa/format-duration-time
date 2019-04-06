// eslint-disable-next-line no-unused-vars
import Duration from './duration';
import FormatTokens from './formatTokens';

export default class Formater {
  private _hour: number = 0;

  private _minute: number = 0;

  private _second: number = 0;

  private _milliSecond: number = 0;

  private _inputTokens: Array<{type: string, inputToken: string, value: number | string}>;

  private _formatTokens: {[key: string]: {token: string, func: Function}} = {};

  static readonly FORMAT_EXPRESSION: RegExp = /\[.+?\]|\*?[Hh]+|\*?m+|\*?s+|\*?S+|./g;

  static readonly TYPE_ORDER = ['hour', 'minute', 'second', 'millisecond', 'text'];

  constructor(
    private duration: Duration,
    private input: string,
    private options: any = {},
  ) {
    const inputTokens = input.match(Formater.FORMAT_EXPRESSION);
    if (inputTokens === null) throw new Error('invalid token!');
    this._inputTokens = inputTokens.map((inputToken) => {
      const type = FormatTokens.formatTokens.filter((types) => {
        const regexp = new RegExp(`^${types.token}+$`);
        return regexp.exec(inputToken);
      });
      return type.length === 0 ? { type: 'text', inputToken, value: '' } : { type: type[0].type, inputToken, value: 0 };
    });
    this.addFormatToken('h', 'hour', this.calcHour);
    this.addFormatToken('m', 'minute', this.calcMin);
    this.addFormatToken('s', 'second', this.calcSec);
    this.addFormatToken('S', 'millisecond', this.calcMilliSec);
  }

  private addFormatToken(token: string, type: string, func: Function): void {
    this._formatTokens[type] = {
      token,
      func,
    };
  }

  private calcHour = (): number => {
    this._hour = Math.floor(this.duration.millisecond / 3600000);
    return this._hour;
  }

  private calcMin = (): number => {
    this._minute = Math.floor((this.duration.millisecond - this._hour * 3600000) / 60000);
    return this._minute;
  }

  private calcSec = (): number => {
    this._second = Math.floor((this.duration.millisecond - this._hour * 3600000
      - this._minute * 60000) / 1000);
    return this._second;
  }

  private calcMilliSec = (): number => {
    this._milliSecond = this.duration.millisecond - this._hour * 3600000
      - this._minute * 60000 - this._second * 1000;
    return this._milliSecond;
  }

  private formatValue(type: string, token: string): string {
    let value = this._formatTokens[type].func();
    if (this.options.digitSeparator) {
      value = this.formatNumber(value);
    }
    value = Formater.zeroPad(String(value), token.length);
    return value;
  }

  private static zeroPad(value: string, length: number): string {
    let s = value;
    if (s.length >= length) return s;
    while (s.length < length) s = `0${s}`;
    return s;
  }

  private formatNumber(value: number): string {
    const parts = String(value).split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${this.options.digitSeparator}`);
    return parts.join('.');
  }

  private formatFunction(type: string, token: string): string {
    if (this._formatTokens[type] && typeof this._formatTokens[type].func === 'function') {
      return this.formatValue(type, token);
    }
    return token.replace(/^\[/, '').replace(/\]$/, '');
  }

  public format(): string {
    if (this._inputTokens === null) return '';
    Formater.TYPE_ORDER.forEach((type) => {
      this._inputTokens.forEach((inputToken) => {
        if (type === inputToken.type) {
          // eslint-disable-next-line no-param-reassign
          inputToken.value = this.formatFunction(inputToken.type, inputToken.inputToken);
        }
      });
    });
    return this._inputTokens.map(inputToken => inputToken.value).join('');
  }
}
