import { useState } from 'react'
import Countrylist from './comonents/Countrylist'

function App() {
  const [searchWord, setSearchWord] = useState("")

  const handleChange = (event) => {
    setSearchWord(event.target.value)
  }

  const handleClickShow = (name) => {
    setSearchWord(name)
  }

  return (
    <div>
      <form>
        find countries
        <input onChange={handleChange} value={searchWord} />
      </form>
      <Countrylist value={searchWord} handleClick={handleClickShow} />
    </div>
  )
}

export default App
