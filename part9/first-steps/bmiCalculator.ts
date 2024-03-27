import { isNotNumber } from './utils';

interface BmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);

  switch (true) {
    case bmi < 16:
      return "Underweight (Severe thinness)";
    case bmi < 16.9:
      return "Underweight (Moderate thinness)";
    case bmi < 18.4:
      return "Underweight (Mild thinness)";
    case bmi < 24.9:
      return "Normal range";
    case bmi < 29.9:
      return "Overweight (Pre-obese)";
    case bmi < 34.9:
      return "Obese (Class I)";
    case bmi < 39.9:
      return "Obese (Class II)";
    case bmi >= 39.9:
      return "Obese (Class III)";
    default:
      return "Invalid values";
  }
};

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enought arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Invalid arguments');
  } else {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }
};

try {
  const { height, weight} = parseArguments(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(bmi);
} catch (error: unknown) {
  let errorMessage = 'New error: ';

  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}