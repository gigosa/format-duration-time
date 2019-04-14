import decimal from './lib/decimal';

const formatTokens: {[key: string]: {type: string, func: Function}} = {
  h: {
    type: 'hour',
    func: (milliSecond: number, options: any = {}) => {
      const hour = milliSecond / 3600000;
      const value = decimal(hour, options.decimalPlace, options.roundType);
      return [value, milliSecond - Number(value) * 3600000];
    },
  },
  m: {
    type: 'minute',
    func: (milliSecond: number, options: any = {}) => {
      const minute = milliSecond / 60000;
      const value = decimal(minute, options.decimalPlace, options.roundType);
      return [value, milliSecond - Number(value) * 60000];
    },
  },
  s: {
    type: 'second',
    func: (milliSecond: number, options: any = {}) => {
      const second = milliSecond / 1000;
      const value = decimal(second, options.decimalPlace, options.roundType);
      return [value, milliSecond - Number(value) * 1000];
    },
  },
  S: {
    type: 'millisecond',
    func: (milliSecond: number, options: any = {}) => {
      const value = decimal(milliSecond, options.decimalPlace, options.roundType);
      return [value, 0];
    },
  },
};

export default formatTokens;
