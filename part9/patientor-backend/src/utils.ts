import { NewPatientEntry, Gender, EntryWithoutId, BaseEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating, HospitalEntry, Diagnose } from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };

    return newEntry;
  }

  throw new Error('Some fields are missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  } 
  else if (!('description' in object && 'date' in object && 'specialist' in object && 'type' in object)) {
    throw new Error('Missing fields');
  }

  const newEntryBase: Omit<BaseEntry, 'id'> = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object)
  };

  // Type Occupational Healthcare
  if (object.type === 'OccupationalHealthcare' && 'employerName' in object) {
    const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
      ...newEntryBase,
      type: 'OccupationalHealthcare',
      employerName: parseString(object.employerName),
    };

    if ('sickLeave' in object && typeof object.sickLeave === 'object' && object.sickLeave !== null
        && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave) {
      newEntry.sickLeave = {
        startDate: parseDate(object.sickLeave.startDate),
        endDate: parseDate(object.sickLeave.endDate)
      };
    }

    return newEntry;
  }

  // Type HealthCheck
  if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
    const newEntry: Omit<HealthCheckEntry, 'id'> = {
      ...newEntryBase,
      type: 'HealthCheck',
      healthCheckRating: parseHealthRating(object.healthCheckRating)
    };

    return newEntry;
  }


  // Type Hospital Entry
  if (object.type === 'Hospital' && 'discharge' in object && typeof object.discharge === 'object' 
      && object.discharge !== null && 'date' in object.discharge && 'criteria' in object.discharge) {
        const newEntry: Omit<HospitalEntry, 'id'> = {
          ...newEntryBase,
          type: 'Hospital',
          discharge: {
            date: parseDate(object.discharge.date),
            criteria: parseString(object.discharge.criteria)
          }
        };

        return newEntry;
    }

    throw new Error('Some fields are missing');
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Invalid name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Invalid date');
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender');
  }

  return gender;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthRating(rating)) {
    throw new Error('Incorect health rating');
  }

  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};


const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (str: string): str is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(str);
};

const isHealthRating = (num: number): num is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(num);
};

export {
  toNewPatientEntry,
  toNewEntry
};