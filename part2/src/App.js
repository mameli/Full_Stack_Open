import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const checkDuplicates = (newName) => {
    const filteredList = persons.filter(p => p.name === newName)
    if (filteredList.length > 0) {
      return filteredList[0].id
    }
    return -1
  }

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const dublicateId = checkDuplicates(newName)
    if (dublicateId === -1) {
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)){
        personService.update(dublicateId,newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== dublicateId ? p : response))
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const delPerson = id => {

    if (window.confirm(`Do you really want to delete?`)) {
      personService.del(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log(
            `Failed to remove item from the server. ${error}`
          );
        })
    }
  }

  const hook = () => {
    personService.getAll()
      .then(returnedPerson => {
        setPersons(returnedPerson)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={nameFilter} onChange={handleNameFilter} />
        </div>
      </form>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(p => p.name.toLowerCase().includes(nameFilter))
          .map(p =>
            <Person key={p.name} person={p} delPerson={() => delPerson(p.id)} />
          )}
      </ul>
    </div>
  )
}

export default App