import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getAll = ():Diagnose[] => {
  return diagnosesData;
};

export default {
  getAll
};