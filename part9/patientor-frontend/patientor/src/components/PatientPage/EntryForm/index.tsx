import { useState } from 'react';
import patientService from '../../../services/patients';
import axios from 'axios';

import { Diagnosis, Entry, EntryWithoutId } from '../../../types';

import './styles.css';
import { TextField, Button, FormControl, Alert, MenuItem, OutlinedInput, Chip, Box, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  id: string;
  setEntryForm: React.Dispatch<React.SetStateAction<boolean>>
  addEntry: (entry: Entry) => void;
  diagnoses: Diagnosis[];
}

const EntryForm = ({ id, setEntryForm, addEntry, diagnoses }: Props) => {
  const [error, setError] = useState('');
  const [type, setType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck 
  const [rating, setRating] = useState(0);

  // Hospital 
  const [dischargeDate, setDischargeDate] = useState<Dayjs>(dayjs());
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  // Occupational Healthcare
  const [employerName, setEmployerName] = useState('');
  const [sickStart, setSickStart] = useState<Dayjs>(dayjs());
  const [sickEnd, setSickEnd] = useState<Dayjs>(dayjs());

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryBase: Omit<EntryWithoutId, 'type'> = {
      description,
      date: date.toString(),
      specialist,
      diagnosisCodes: diagnosisCodes
    };

    let entryObject: EntryWithoutId;

    switch (type) {
      case 'Hospital': 
        entryObject = {
          ...entryBase,
          type: 'Hospital',
          discharge: {
            date: dischargeDate.toString(),
            criteria: dischargeCriteria
          }
        };
        break;
      case 'HealthCheck':
        entryObject = {
          ...entryBase,
          type: 'HealthCheck',
          healthCheckRating: rating
        };
        break;
      case 'OccupationalHealthcare':
        entryObject = {
          ...entryBase,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: {
            startDate: sickStart.toString(),
            endDate: sickEnd.toString()
          }
        };
        break;
      default:
        throw new Error('Invalid type');
    }

    try {
      const entry: Entry = await patientService.addEntry(id, entryObject);
      addEntry(entry);
    } catch (error: unknown) {
      let errorMessage = 'Error: ';
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        errorMessage += error.response?.data;
      }

      setError(errorMessage);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  
  return (
    <div className='form-block'>
      <Button 
        variant='contained'
        onClick={() => setType('HealthCheck')}
      >HealthCheck Entry</Button>
      <Button 
        variant='contained'
        onClick={() => setType('Hospital')}
      >Hospital Entry</Button>
      <Button 
        variant='contained'
        onClick={() => setType('OccupationalHealthcare')}
      >Occupational Healthcare Entry</Button>

      <h3>New {type} entry</h3>

      {error && 
        <Alert severity="error">{error}</Alert>
      }

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={handleNewEntry}>
          <FormControl margin='normal'  fullWidth required>
            <TextField 
              label='Description' 
              value={description} 
              onChange={(event) => setDescription(event.target.value)} 
              id='description' 
              variant='outlined' 
            />
          </FormControl>

          <FormControl margin='normal' fullWidth required>
            <DatePicker 
              label='Date' 
              value={date}
              onChange={(newValue) => newValue !== null ? setDate(newValue) : setDate(dayjs())}
            />
          </FormControl>

          <FormControl margin='normal' fullWidth required>
            <TextField 
              label='Specialist' 
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
              id='specialist' 
              variant='outlined' 
            />
          </FormControl>

          <FormControl margin='normal' fullWidth>
          <InputLabel>Diagnosis codes</InputLabel>
            <Select
              multiple
              value={diagnosisCodes}
              onChange={handleDiagnosisCodeChange}
              input={<OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map(diagnosis => (
                <MenuItem 
                  key={diagnosis.code}
                  value={diagnosis.code}
                >
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>

          {type === 'HealthCheck' && 
            <FormControl margin='normal' fullWidth required>
              <TextField 
                label='HealthCheck Rating' 
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                type='number' 
                id='rating' 
                variant='outlined' 
              />
            </FormControl>
          }

          {type === 'Hospital' &&
            <FormControl margin='normal' fullWidth required>
              <DatePicker  
                label='Discharge date'
                value={dischargeDate}
                onChange={(newValue) => newValue !== null ? setDischargeDate(newValue) : setDischargeDate(dayjs())}
              />
            </FormControl>
          }

          {type === 'Hospital' &&
            <FormControl margin='normal' fullWidth required>
              <TextField 
                label='Discharge Criteria'
                value={dischargeCriteria}
                onChange={(event) => setDischargeCriteria(event.target.value)}
                id='discharge-criteria'
                variant='outlined' 
              />
            </FormControl>
          }

          {type === 'OccupationalHealthcare' &&
            <FormControl margin='normal' fullWidth required>
              <TextField 
                label='Employer Name'
                value={employerName}
                onChange={(event) => setEmployerName(event.target.value)}
                id='employer-name'
                variant='outlined' 
              />
            </FormControl>
          }

          {type === 'OccupationalHealthcare' &&
            <FormControl margin='normal' fullWidth required>
              <DatePicker 
                label='Sick Start Date'
                value={sickStart}
                onChange={(newValue) => newValue !== null ? setSickStart(newValue) : setSickStart(dayjs())}
              />
            </FormControl>
          }

          {type === 'OccupationalHealthcare' &&
            <FormControl margin='normal' fullWidth required>
              <DatePicker 
                label='Sick End Date'
                value={sickEnd}
                onChange={(newValue) => newValue !== null ? setSickEnd(newValue) : setSickEnd(dayjs())}
              />
            </FormControl>
          }

          <Button 
            variant='contained' 
            color='error' 
            onClick={() => setEntryForm(false)}
          >Cancel</Button>

          <Button 
            variant='contained' 
            type='submit'
          >Add</Button>
        </form>
      </LocalizationProvider>
    </div>
  );
};

export default EntryForm;