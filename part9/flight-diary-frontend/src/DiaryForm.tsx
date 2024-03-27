import { useState } from 'react';
import diaryService from './services/diary';
import { Diary, Visibility, Weather } from './types';

interface DiaryFormProps {
  diaries: Diary[];
  setDiaries: (diaries: Diary[]) => void;
}

const DiaryForm = (props: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const visibilityOptions = Object.values(Visibility);
  const weatherOptions = Object.values(Weather);

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value);
  }

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
  }

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    diaryService.addEntry({ date, visibility, weather, comment })
      .then(data => {
        props.setDiaries(props.diaries.concat(data))
      })
      .catch(error => {
        let errorMessage = 'Error: '
        if (error instanceof Error) {
          errorMessage += error.message;
        }
        
        setError(errorMessage);
        setTimeout(() => {
          setError('');
        }, 5000)
      })
  }

  return (
    <>
      <h4 style={{ color: 'red' }}>{error}</h4>
      <form onSubmit={handleSubmit}>
        <div>
          date:
          <input 
            type='date'
            value={date} 
            onChange={(event) => setDate(event.target.value)} 
          />
        </div>
        <div>
          visibility: 
          {visibilityOptions.map(option => (
            <label key={option}>
              <input 
                type='radio'
                value={option}
                checked={option == visibility}
                onChange={handleVisibilityChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather:
          {weatherOptions.map(option => (
            <label key={option}>
              <input 
                type='radio'
                value={option}
                checked={option == weather}
                onChange={handleWeatherChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          comment: 
          <input 
            value={comment} 
            onChange={(event) => setComment(event.target.value)} 
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default DiaryForm;