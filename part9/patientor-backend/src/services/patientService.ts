import patientsData from '../../data/patients';
import { NonSensitivePatient, NewPatientEntry, Patient, EntryWithoutId, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const getAll = ():NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getById = (id: string):Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const addPatientEntry = (object: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...object
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, object: EntryWithoutId): Entry | undefined => {
  const newEntry = {
    id: uuid(),
    ...object
  };

  const patient = patientsData.find(p => p.id === id);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  getById,
  addPatientEntry,
  addEntry
};