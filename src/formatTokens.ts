export default class FormatTokens {
  static get formatTokens(): Array<{type: string, token: string}> {
    return [
      {
        type: 'hour',
        token: 'h',
      },
      {
        type: 'minute',
        token: 'm',
      },
      {
        type: 'second',
        token: 's',
      },
      {
        type: 'millisecond',
        token: 'S',
      },
    ];
  }
}
