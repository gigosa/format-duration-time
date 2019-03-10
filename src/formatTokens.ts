export default class FormatTokens {
  static get formatTokens(): Array<{type: string, token: string, value: number}> {
    return [
      {
        type: 'hour',
        token: 'h',
        value: 0
      },
      {
        type: 'hour',
        token: 'hh',
        value: 0
      },
      {
        type: 'minute',
        token: 'm',
        value: 0
      },
      {
        type: 'minute',
        token: 'mm',
        value: 0
      },
      {
        type: 'second',
        token: 's',
        value: 0
      },
      {
        type: 'second',
        token: 'ss',
        value: 0
      },
      {
        type: 'millisecond',
        token: 'ms',
        value: 0
      }
    ];
  }
}