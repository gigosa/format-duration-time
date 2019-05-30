function getRoundFunction(roundType: string): Function {
  switch (roundType) {
    case 'ceil': {
      return Math.ceil;
    }
    case 'round': {
      return Math.round;
    }
    case 'floor':
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
