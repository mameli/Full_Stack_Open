import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'


const App = () => {
  const [Countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')


  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Countries</h2>
      <form>
        <div>
          filter contries <input value={nameFilter} onChange={handleNameFilter} />
        </div>
      </form>
      <p />
      <CountryList Countries={Countries} nameFilter={nameFilter} />
    </div>
  )
}

export default App