import duration from '../src/index';

test('add', () => {
  const firstDuration = duration(1);
  const addDuration = firstDuration.add(1);
  expect(addDuration.millisecond).toBe(2);
  expect(firstDuration.millisecond).toBe(1);
})

test('sub', () => {
  const firstDuration = duration(2);
  const subDuration = firstDuration.sub(1);
  expect(subDuration.millisecond).toBe(1);
  expect(firstDuration.millisecond).toBe(2);
})