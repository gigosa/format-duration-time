// eslint-disable-next-line no-unused-vars
import Duration from './duration';
import formatTokens from './formatTokens';
import paddingZero from './lib/paddingZero';
import digitSeparator from './lib/digitSeparator';

export default class Formater {
  private _hour: number = 0;

  private _minute: number = 0;

  private _second: number = 0;

  private _milliSecond: number = 0;

  private _inputTokens: Array<{type: string, token: string, value: number | string}>;

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
      const matchedToken = Object.keys(formatTokens).filter((token) => {
        const regexp = new RegExp(`^${token}+$`);
        return regexp.exec(inputToken);
      })[0];
      return matchedToken ? { type: formatTokens[matchedToken].type, token: inputToken, value: 0 } : { type: 'text', token: inputToken, value: '' };
    });
  }

  private formatFunction(token: string, milliSecond: number): [string, number] {
    const firstToken = token.slice(0, 1);
    if (formatTokens[firstToken] && typeof formatTokens[firstToken].func === 'function') {
      const [value, restMilliSecond] = formatTokens[firstToken].func(milliSecond);
      let formattedValue = String(value);
      formattedValue = paddingZero(formattedValue, token.length);
      if (this.options.digitSeparator) {
        formattedValue = digitSeparator(formattedValue, this.options.digitSeparator);
      }
      return [formattedValue, restMilliSecond];
    }
    return [token.replace(/^\[/, '').replace(/\]$/, ''), milliSecond];
  }

  public format(): string {
    if (this._inputTokens === null) return '';
    let milliSecond = this.duration.millisecond;
    Formater.TYPE_ORDER.forEach((type) => {
      this._inputTokens.forEach((inputToken) => {
        if (type === inputToken.type) {
          // eslint-disable-next-line no-param-reassign
          [inputToken.value, milliSecond] = this.formatFunction(inputToken.token, milliSecond);
        }
      });
    });
    return this._inputTokens.map(inputToken => inputToken.value).join('');
  }
}
