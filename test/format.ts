import duration from '../src/index';

test('h must return floored hour', () => {
  expect(duration(7199999).format('h')).toBe('1');
})

test('h with ceil rounding must return ceiled hour', () => {
  expect(duration(7199999).format('h', { roundType: 'ceil'})).toBe('2');
})

test('hour with text', () => {
  expect(duration(3600000).format('h時間')).toBe('1時間');
})

test('h must return 0 if input is less than 1 hour', () => {
  expect(duration(3599999).format('h')).toBe('0');
})

test('m must return floored minutes', () => {
  expect(duration(61000).format('m')).toBe('1');
})

test('m with ceil rounding must return ceiled minutes', () => {
  expect(duration(61000).format('m', { roundType: 'ceil' })).toBe('2');
})

test('m must return 0 if input is less than 1 minute', () => {
  expect(duration(59999).format('m')).toBe('0');
})

test('mm must return padded minute', () => {
  expect(duration(60000).format('mm')).toBe('01');
})

test('h:mm must return formated hour and minute', () => {
  expect(duration(9000000).format('h:mm')).toBe('2:30');
})

test('s must return floored second', () => {
  expect(duration(100500).format('s')).toBe('100');
})

test('s with ceil rounding must return ceiled second', () => {
  expect(duration(100500).format('s', { roundType: 'ceil' })).toBe('101');
})

test('mm:h must return 30:2 when input is 9000 second', () =>{
  expect(duration(9000000).format('mm:h')).toBe('30:2');
})

test('S returns milli second', () => {
  expect(duration(12345).format('S')).toBe('12345');
})

test('input type second', () => {
  expect(duration(60, 's').format('m')).toBe('1');
})

test('escape', () => {
  expect(duration(1, 'h').format('m[minute]ss[second]')).toBe('60minute00second');
})

test('digit separator', () => {
  expect(duration(1000).format('S', {digitSeparator: ','})).toBe('1,000');
})

test('padding a lot', () => {
  expect(duration(1000, 'S').format('SSSSSS')).toBe('001000');
})

test('decimal place', () => {
  expect(duration(20, 'm').format('h', { decimalPlace: 2 })).toBe('0.33');
})

test('decimal place minus', () => {
  expect(duration(900, 'm').format('hh', { decimalPlace: -1})).toBe('10');
})

test('round type floor', () => {
  expect(duration(59, 's').format('m', { roundType: 'floor'})).toBe('0');
})

test('round type ceil', () => {
  expect(duration(59, 's').format('m', { roundType: 'ceil'})).toBe('1');
})

test('round type round', () => {
  expect(duration(30, 's').format('m', { roundType: 'round'})).toBe('1');
})

test('using decimal with multiple template token', () => {
  expect(duration(90, 'm').format('h:m', { decimalPlace: 3})).toBe('1:30.000');
})

test('using all options', () => {
  expect(duration(91, 'm').format('h [hour]', { digitSeparator: ',', decimalPlace: 3, roundType: 'round'})).toBe('1.517 hour');
})

test('day', () => {
  expect(duration(24, 'h').format('dd')).toBe('01');
})