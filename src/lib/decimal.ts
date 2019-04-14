export default function decimal(value: number, decimalPlace: number): string {
  const exponent = decimalPlace ? 10 ** decimalPlace : 1;
  const decimalValue = Math.floor(value * exponent) / exponent;
  return decimalValue.toFixed(decimalPlace > 0 ? decimalPlace : 0);
}
