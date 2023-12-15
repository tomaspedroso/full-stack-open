const Person = ({person, handleDelete}) => {
  return (
    <li>{person.name} {person.number} <button onClick={() => {handleDelete(person)}}>delete</button></li>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <ul>
      {persons.map((person) => 
        <Person person={person} key={person.name} handleDelete={handleDelete}/>
      )}      
    </ul>
  )
}

export default Persons