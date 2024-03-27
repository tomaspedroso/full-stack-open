import { isNotNumber } from './utils';

interface PeriodOverview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number,
  ratingDescription: string;
  target: number;
  average: number;
}

interface DaysExercise {
  average: number;
  daysExercise: number[];
}

export const calculateExercises = (targetAmount: number, dayExercises: number[]): PeriodOverview => {
  let trainingDays: number = 0;
  let average: number = 0;
  let rating: number;
  let ratingDescription: string;

  for (const day of dayExercises) {
    if (day !== 0) {
      trainingDays++;
    }
    average += day;
  }

  average /= dayExercises.length;
  
  if (average < targetAmount / 2) {
    rating = 1;
    ratingDescription = 'bad week, could be better';
  } else if (average < targetAmount) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'good week!';
  }

  return {
    periodLength: dayExercises.length,
    trainingDays,
    success: average > targetAmount,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  };
};

const parseArguments = (args: string[]): DaysExercise => {
  let average: number;

  if (isNotNumber(args[2])) {
    throw new Error('Invalid average number');
  } else {
    average = Number(args[2]);
  }

  const daysExercise = args
    .slice(3)
    .map(arg => Number(arg))
    .filter(num => !isNotNumber(num));

  if (daysExercise.length === 0) {
    throw new Error('No valid arguments for days');
  }

  return {
    average,
    daysExercise
  };
};

try {
  const { average, daysExercise } = parseArguments(process.argv);
  const result = calculateExercises(average, daysExercise);
  console.log(result);
} catch (error) {
  let errorMessage = 'New error: ';

  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}