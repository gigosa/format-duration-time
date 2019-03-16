import Duration from './duration';

export default function duration(value: number, unit: string): Duration {
  return new Duration(value, unit);
}
