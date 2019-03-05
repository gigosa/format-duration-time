const Duration = require('../dist/index').default;

test('h must return floored hour', () => {
  const duration = new Duration(3660);
  expect(duration.format('h')).toBe('1');
})

test('h must return 0 if input is less than 1 hour', () => {
  const duration = new Duration(0);
  expect(duration.format('h')).toBe('0');
})

test('m must return floored minutes', () => {
  const duration = new Duration(61);
  expect(duration.format('m')).toBe('1');
})

test('m must return 0 if input is less than 1 minute', () => {
  const duration = new Duration(1);
  expect(duration.format('m')).toBe('0');
})

test('mm must return padded minute', () => {
  const duration = new Duration(6000);
  expect(duration.format('mm')).toBe('100');
})

test('h:mm must return formated hour and minute', () => {
  const duration = new Duration(9000);
  expect(duration.format('h:mm')).toBe('2:30');
})