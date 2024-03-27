import axios from 'axios';
import { Diary } from '../types';

const baseUrl = 'http://127.0.0.1:3000/api/diaries'

const getAll = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

const addEntry = async (entry: unknown) => {
  try {
    const response = await axios.post<Diary>(baseUrl, entry);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }

    throw new Error('Something wrong not related to axios happened');
  }
};

export default { getAll, addEntry }