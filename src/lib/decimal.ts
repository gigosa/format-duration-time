function getRoundFunction(roundType: string): Function {
  switch (roundType) {
    case 'floor': {
      return Math.floor;
    }
    case 'round': {
      return Math.round;
    }
    default: {
      return Math.floor;
    }
  }
}

export default function decimal(value: number, decimalPlace: number, roundType: string): string {
  const exponent = decimalPlace ? 10 ** decimalPlace : 1;
  const roundFunc = getRoundFunction(roundType);
  const decimalValue = roundFunc(value * exponent) / exponent;
  return decimalValue.toFixed(decimalPlace > 0 ? decimalPlace : 0);
}
