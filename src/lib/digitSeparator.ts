export default function digitSeparator(value: string, separator: string) {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
  return parts.join('.');
}
