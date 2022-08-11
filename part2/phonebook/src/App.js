import { useState } from 'react'

const Person = ({ name, number }) => {
  return(
    <p>{name} {number}</p>
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

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => <Person name={person.name} number={person.number} key={person.id}/>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }

    const found = persons.find(person => person.name === personObject.name)

    if(found !== undefined){
      alert(`${found.name} is already in the phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(personObject));
      setFilteredPersons(filteredPersons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} onNameChange={handleNewNameChange} newNumber={newNumber} onNumberChange={handleNewNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App