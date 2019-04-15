import decimal from './lib/decimal';

const formatTokens: {[key: string]: {type: string, func: Function}} = {
  h: {
    type: 'hour',
    func: (milliSecond: number, options: any = {}, isSmallest: boolean) => {
      const hour = milliSecond / 3600000;
      const value = isSmallest ? decimal(hour, options.decimalPlace, options.roundType)
        : Math.floor(hour);
      return [value, milliSecond - Number(value) * 3600000];
    },
  },
  m: {
    type: 'minute',
    func: (milliSecond: number, options: any = {}, isSmallest: boolean) => {
      const minute = milliSecond / 60000;
      const value = isSmallest ? decimal(minute, options.decimalPlace, options.roundType)
        : Math.floor(minute);
      return [value, milliSecond - Number(value) * 60000];
    },
  },
  s: {
    type: 'second',
    func: (milliSecond: number, options: any = {}, isSmallest: boolean) => {
      const second = milliSecond / 1000;
      const value = isSmallest ? decimal(second, options.decimalPlace, options.roundType)
        : Math.floor(second);
      return [value, milliSecond - Number(value) * 1000];
    },
  },
  S: {
    type: 'millisecond',
    func: (milliSecond: number, options: any = {}, isSmallest: boolean) => {
      const value = isSmallest ? decimal(milliSecond, options.decimalPlace, options.roundType)
        : Math.floor(milliSecond);
      return [value, 0];
    },
  },
};

export default formatTokens;
