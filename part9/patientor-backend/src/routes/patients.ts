import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const addedEntry = patientService.addPatientEntry(toNewPatientEntry(req.body));

    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const addedEntry = patientService.addEntry(req.params.id, toNewEntry(req.body));

    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    
    res.status(400).send(errorMessage);
  }
});

export default router;