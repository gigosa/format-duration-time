export default function paddingZero(value: string, length: number) {
  let output = value;
  while (output.length < length) {
    output = `0${output}`;
  }
  return output;
}
