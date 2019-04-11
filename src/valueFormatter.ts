export default class ValueFormatter {
  constructor(
    private value: string,
  ) {
  }

  public zeroPad(length: number): string {
    let s = this.value;
    if (s.length >= length) return s;
    while (s.length < length) s = `0${s}`;
    return s;
  }

  private addDigitSeparator(digitSeparator: string): string {
    const parts = String(this.value).split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${digitSeparator}`);
    return parts.join('.');
  }
}
