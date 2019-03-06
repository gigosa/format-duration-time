import Duration from './duration';

export function duration(duration: number, unit: string): Duration {
  return new Duration(duration, unit);
}