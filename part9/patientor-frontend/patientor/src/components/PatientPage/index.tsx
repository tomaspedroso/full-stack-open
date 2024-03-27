import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";

import { Diagnosis, Entry, Patient } from "../../types";

import { Female, Male } from '@mui/icons-material';
import { Button } from "@mui/material";
import HospitalEntryBox from "./Entries/HospitalEntryBox";
import HealthCheckEntryBox from "./Entries/HealthCheckEntryBox";
import OccupationalHealthcareEntryBox from "./Entries/OccupationalHealthcareEntryBox";
import EntryForm from "./EntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState("");
  const [entryForm, setEntryForm] = useState(false);
  
  useEffect(() => {
    patientService.getById(id)
      .then(data => {
        setPatient(data);
      })
      .catch(error => {
        setError(error.message);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const addEntry = (entry: Entry) => {
    if (patient) {
      const updatedPatient: Patient = {
        ...patient,
        entries: [...patient.entries, entry]
      };
  
      setPatient(updatedPatient);
    }
  };

  if (error) {
    return (
      <h3>{error}</h3>
    );
  }

  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}
          {patient.gender === 'male' ? <Male /> : 
           patient.gender === 'female' ? <Female /> : ''}
        </h2>
        <p>
          ssn: {patient.ssn} <br/>
          Occupation: {patient.occupation}
        </p>

        <h3>Entries</h3>

        <Button 
          onClick={() => setEntryForm(true)}
          variant='contained'
          style={{ marginBottom: '10px'}}
        >Add entry</Button>

        {entryForm && 
          <EntryForm 
            id={patient.id} 
            setEntryForm={setEntryForm} 
            addEntry={addEntry}
            diagnoses={diagnoses}
          />
        }

        {patient.entries.map(entry => {
          const diagonosesList: Diagnosis[] = [];

          entry.diagnosisCodes?.map(code => {
            const diagonosis = diagnoses.find(diagnosis => diagnosis.code === code);
            
            if (diagonosis) {
              diagonosesList.push(diagonosis);
            }
          });
          
          switch (entry.type) {
            case 'Hospital':
              return <HospitalEntryBox entry={entry} diagnoses={diagonosesList} key={entry.id} />;
            case 'HealthCheck':
              return <HealthCheckEntryBox entry={entry} diagnoses={diagonosesList} key={entry.id} />;
            case 'OccupationalHealthcare':
              return <OccupationalHealthcareEntryBox entry={entry} diagnoses={diagonosesList} key={entry.id} />;
            default:
              return assertNever(entry);
          }
        })}
      </div>
    );
  }
};

export default PatientPage;