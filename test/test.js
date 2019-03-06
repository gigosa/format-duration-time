const { duration } = require('../dist/index');

test('h must return floored hour', () => {
  expect(duration(3600).format('h')).toBe('1');
})

test('h must return 0 if input is less than 1 hour', () => {
  expect(duration(3599).format('h')).toBe('0');
})

test('m must return floored minutes', () => {
  expect(duration(61).format('m')).toBe('1');
})

test('m must return 0 if input is less than 1 minute', () => {
  expect(duration(59).format('m')).toBe('0');
})

test('mm must return padded minute', () => {
  expect(duration(6000).format('mm')).toBe('100');
})

test('h:mm must return formated hour and minute', () => {
  expect(duration(9000).format('h:mm')).toBe('2:30');
})

test('s must return floored second', () => {
  expect(duration(100).format('s')).toBe('100');
})

test('mm:h must return 30:2 when input is 9000 second', () =>{
  expect(duration(9000).format('mm:h')).toBe('30:2');
})