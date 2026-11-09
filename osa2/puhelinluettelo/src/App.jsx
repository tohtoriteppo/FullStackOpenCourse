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
    if(people.some(person => person.name === newName))
    {
      const person = people.find(person => person.name === newName);
      if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`))
      {
        const changedPerson = { ...person, number: newNumber }
        peopleService
        .update(changedPerson)
          .then(returnedPerson => {
            console.log(`response: ${returnedPerson}`)
            setPeople(people.map(obj => obj.id !== person.id ? obj : returnedPerson))
          })
          
      }
    }
    else{
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
  }

  const handleRemoveClick = (id) => {
    const person = people.find(person => person.id === id);
    if(window.confirm(`Delete ${person.name}?`))
    {
      peopleService
      .remove(id).then(
        setPeople(people.filter(person => person.id !== id))
      )
    }
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