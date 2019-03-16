import Duration from './duration';

export default function duration(value: number, unit: string = 'S'): Duration {
  return new Duration(value, unit);
}
