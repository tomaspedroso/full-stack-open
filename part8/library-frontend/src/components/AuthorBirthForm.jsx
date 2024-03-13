import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const AuthorBirthForm = ({ authors }) => {
  const [selectedName, setSelectedName] = useState(null)
  const [birthyear, setBirthyear] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  const handleAuthorEdit = (event) => {
    event.preventDefault()
    
    editAuthor({ variables: { name: selectedName.value, setBornTo: parseInt(birthyear)} })
    setBirthyear('')
  }

  const nameOptions = authors.map(author => ({ value: author.name, label: author.name }))

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={handleAuthorEdit}>
        <div  style={{width: "200px"}}>
          <Select 
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={nameOptions}
          />
        </div>
        <div>
          born
          <input type='number' value={birthyear} onChange={({ target }) => setBirthyear(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthForm