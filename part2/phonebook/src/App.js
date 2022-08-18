import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Person = ({ name, number, deleteFunction }) => {
  return(
    <div>
      {name} {number}
      <button onClick={deleteFunction}>delete</button>
    </div>
  )
}

const Filter = ({ filter, onFilterChange }) => {
  return (
    <>
    filter shown with <input value={filter} onChange={onFilterChange}/>
    </>
  )
}

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = ({ message, flag }) => {
  if (message === '') {
    return null
  }

  return (
    <div className={flag}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationFlag, setNotificationFlag] = useState('notification')

  useEffect(()=>{
    personService.getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
        setFilteredPersons(persons)
      })
  },[])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    const filteredPersonsActual = persons.filter(person => (person.name).toLowerCase().includes(filter.toLowerCase()))
    setFilteredPersons(filteredPersonsActual)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(person => person.name === personObject.name)

    if(found !== undefined){
      if(window.confirm(`${found.name} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(found.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setFilteredPersons(filteredPersons.map(person => person.id !== found.id ? person : returnedPerson))
          })
          .catch(error => {
            setNotificationFlag('error')
            setNotificationMessage(
              `Person '${found.name}' was already removed from server`
            )
            setTimeout(() => {
              setNotificationFlag('notification')
              setNotificationMessage('')
            }, 5000)
          })
        
        setNewName('')
        setNewNumber('')
      }else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(filteredPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(()=>{
            setNotificationMessage('')
          }, 5000)
        })
    }
  }

  const deletePerson = (name, id) => {
    console.log('clicked delete')
    if(window.confirm(`Delete ${name} ?`)){
      personService.deletePerson(id)
      .then(responseData => {
        console.log(`Deleted successfully ${responseData}`)
        personService.getAll()
          .then(persons => {
            console.log('promise fulfilled persons with delete')
            setPersons(persons)
            setFilteredPersons(persons)
          })
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} flag={notificationFlag}/>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} onNameChange={handleNewNameChange} newNumber={newNumber} onNumberChange={handleNewNumberChange}/>
      <h3>Numbers</h3>
      <div>
        {filteredPersons.map(person => <Person name={person.name} number={person.number} deleteFunction={() => deletePerson(person.name, person.id)} id={person.id} key={person.id}/>)}
      </div>
    </div>
  )
}

export default App