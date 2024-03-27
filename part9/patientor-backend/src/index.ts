import express from 'express';
import cors from 'cors';
import dianoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', dianoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});