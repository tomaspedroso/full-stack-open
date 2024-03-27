import { Diagnosis, HealthCheckEntry } from "../../../types";
import './styles.css';
import { MedicalServices, Favorite } from '@mui/icons-material';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntryBox = ({ entry, diagnoses }: Props) => {
  let color: string;

  switch (entry.healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default: 
      color = 'black';
  }

  return (
    <div className='entry-block'>
      <h4>{entry.date} <MedicalServices /></h4> 

      <i>{entry.description}</i> <br/>
      <Favorite sx={{ color: {color}}}/> <br/>

      <ul>
        {diagnoses.map(diagnosis => (
          <li key={diagnosis.code}>{diagnosis.code} - {diagnosis.name}</li>
        ))}
      </ul>
      <span>diagnosed by {entry.specialist}</span>
    </div>
  );
};

export default HealthCheckEntryBox;