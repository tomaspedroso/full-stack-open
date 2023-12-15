import './index.css'
import { useEffect } from 'react'
import { useState } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='Notification'>
      { message }
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  const redstyle = {
    color: 'red'
  }

  return (
    <div className='Notification' style={redstyle}>
      { message }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {  
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setFilterName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const dupPerson = persons.find((person) => person.name === newName)
    if(dupPerson) 
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...dupPerson, number: newNumber }

        personsService
          .updatePerson(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map((person) => person.id !== changedPerson.id ? person : changedPerson))

            setNotificationMessage(`Changed ${response.name} phone number`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    }
    else 
    {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      console.log(newName)
      personsService
        .createPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))

          setNotificationMessage(`Added ${response.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })

      setNewName("")
      setNewNumber("")   
    } 
  }

  const handleDelete = (p) => {

    if (window.confirm(`Delete ${p.name} ?`)) {
      personsService
        .deletePerson(p.id)
        .then(
          setPersons(persons.filter((person) => person.id != p.id))
        )
        .catch(error => {
          setErrorMessage(`Information of ${p.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } 
  }

  const personsToShow = filterName 
    ? persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase())) 
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
          <Notification message={notificationMessage} />
          <Error message={errorMessage} />
          <Filter value={filterName} onChange={handleChangeFilter} />   

      <h2>add a new</h2>
          <PersonForm name={newName} number={newNumber} nameChange={handleChangeName} numberChange={handleChangeNumber} onSubmit={handleSubmit} />

      <h2>Numbers</h2>
        <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App