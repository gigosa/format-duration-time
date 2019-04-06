import duration from '../src/index';

test('h must return floored hour', () => {
  expect(duration(3600000).format('h')).toBe('1');
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
  expect(duration(100000).format('s')).toBe('100');
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