import { useState, useEffect } from 'react'
import axios from 'axios'
import peopleService from './services/people'

const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const People = ({filtered, handleButtonClick}) => {
  return(
    <div>
      {filtered.map(person =>
        <p key={person.name}>{person.name} {person.number} <button onClick={() => handleButtonClick(person.id)}>Delete</button></p>
      )}
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
        .then(initialPeople => {
        setPeople(initialPeople)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const url = `http://localhost:3001/people`
    if(people.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    peopleService
      .create(personObject)
        .then(returnedPerson => {
        setPeople(people.concat(returnedPerson))
      })
  }

  const handleRemoveClick = (id) => {
    console.log("clicked "+id);
    peopleService
      .remove(id).then(
        setPeople(people.filter(person => person.id !== id))
      )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const filtered = people.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      <People filtered={filtered} handleButtonClick={handleRemoveClick}></People>
    </div>
  )
}

export default App