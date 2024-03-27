import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from './utils';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (height && weight && !isNotNumber(height) && !isNotNumber(weight)) {
    return res.json({
      height,
      weight,
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } else {
    return res.json({
      error: 'malformatted parameters'
    });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  
  if (!target || !daily_exercises) {
    return res.json({
      error: "parameters missing"
    });
  }

  if (isNotNumber(target) || !Array.isArray(daily_exercises) || daily_exercises.some(isNotNumber)) {
    return res.json({
      error: "malformatted parameters"
    });
  }
  
  const target_number = target as number;
  const daily_exercises_array = daily_exercises as number[];

  const result = calculateExercises(target_number, daily_exercises_array);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
