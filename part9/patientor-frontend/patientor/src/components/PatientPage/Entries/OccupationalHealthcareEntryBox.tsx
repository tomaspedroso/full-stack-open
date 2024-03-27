import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import './styles.css';
import { Work } from '@mui/icons-material';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryBox = ({ entry, diagnoses }: Props) => {

  return (
    <div className='entry-block'>
      <h4>{entry.date} <Work /> {entry.employerName}</h4>

      <i>{entry.description}</i> <br/>

      <ul>
        {diagnoses.map(diagnosis => (
          <li key={diagnosis.code}>{diagnosis.code} - {diagnosis.name}</li>
        ))}
      </ul>
      <span>diagnosed by {entry.specialist}</span>
    </div>
  );
};

export default OccupationalHealthcareEntryBox;