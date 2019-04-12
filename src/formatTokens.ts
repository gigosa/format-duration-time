const formatTokens: {[key: string]: {type: string, func: Function}} = {
  h: {
    type: 'hour',
    func: (milliSecond: number, options: any = {}) => {
      const exponent = options.decimalPlace > 1 ? 10 ** options.decimalPlace : 1;
      const hour = Math.floor((milliSecond / 3600000) * exponent) / exponent;
      return [hour, milliSecond - hour * 3600000];
    },
  },
  m: {
    type: 'minute',
    func: (milliSecond: number, options: any = {}) => {
      const exponent = options.decimalPlace > 1 ? 10 ** options.decimalPlace : 1;
      const minute = Math.floor((milliSecond / 60000) * exponent) / exponent;
      return [minute, milliSecond - minute * 60000];
    },
  },
  s: {
    type: 'second',
    func: (milliSecond: number, options: any = {}) => {
      const exponent = options.decimalPlace > 1 ? 10 ** options.decimalPlace : 1;
      const second = Math.floor((milliSecond / 1000) * exponent) / exponent;
      return [second, milliSecond - second * 1000];
    },
  },
  S: {
    type: 'millisecond',
    func: (milliSecond: number) => [milliSecond, 0],
  },
};

export default formatTokens;
