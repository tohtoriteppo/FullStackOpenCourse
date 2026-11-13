import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import People from './components/People'


const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [messageColor, setMessageColor] = useState('green')

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
          .update(changedPerson).then(returnedPerson => {
              setPeople(people.map(obj => obj.id !== person.id ? obj : returnedPerson))
              setErrorMessage(`Updated number of ${returnedPerson.name}`)
              setMessageColor('green')
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            })
            .catch(error => {
              setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
              setMessageColor('red')
              setPeople(people.filter(n => n.id !== person.id))
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
          setErrorMessage(`Added ${personObject.name}`)
          setMessageColor('green')
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const handleRemoveClick = (id) => {
    const person = people.find(person => person.id === id);
    if(window.confirm(`Delete ${person.name}?`))
    {
      peopleService
      .remove(id).then(() => {
        setPeople(people.filter(person => person.id !== id))
        setErrorMessage(`Deleted ${person.name}`)
        setMessageColor('green')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
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
      <Notification message={errorMessage} messageColor={messageColor}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></PersonForm>
      <h3>Numbers</h3>
      <People filtered={filtered} handleButtonClick={handleRemoveClick}></People>
    </div>
  )
}

export default App