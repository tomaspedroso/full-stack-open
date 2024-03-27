import { useEffect, useState } from 'react';
import DiaryForm from './DiaryForm';
import { Diary } from './types';
import diaryService from './services/diary';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    })
  }, [])

  return (
    <div>
      <h2>Add new entry</h2>
      <DiaryForm diaries={diaries} setDiaries={setDiaries}/>

      <h2>Diary Entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <p>
            visibility: {diary.visibility} <br/>
            weather: {diary.weather}
          </p>
        </div>
      ))}
    </div>
  )
}

export default App
