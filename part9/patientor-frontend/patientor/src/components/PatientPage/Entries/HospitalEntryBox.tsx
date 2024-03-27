import { Diagnosis, HospitalEntry } from "../../../types";
import './styles.css';
import { LocalHospital } from "@mui/icons-material";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryBox = ({ entry, diagnoses }: Props) => {

  return (
    <div className="entry-block">
      <h4>{entry.date} <LocalHospital /></h4>

      <i>{entry.description}</i>

      <ul>
        {diagnoses.map(diagnosis => (
          <li key={diagnosis.code}>{diagnosis.code} - {diagnosis.name}</li>
        ))}
      </ul>
      <span>diagnosed by {entry.specialist}</span>
    </div>
  );
};

export default HospitalEntryBox;