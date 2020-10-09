import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import SimpleCountry from './components/SimpleCountry'

const CountryList = (props) => {
  const filteredCountries = props.Countries.filter(c => c.name.toLowerCase().includes(props.nameFilter.toLowerCase()))
  if (filteredCountries.length >= 5){
    return (
      <div>Too many matches, specity another filter</div>
    )
  }
  if (filteredCountries.length === 1){
    return (
        filteredCountries.map(c =>
          <Country key={c.alpha2Code} Country={c} />
        )
    )
  }
  return (
    filteredCountries.map(c =>
      <SimpleCountry key={c.alpha2Code} Country={c} />
    ) 
  )
}
const App = () => {
  const [Countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  return (
    <div>
      <h2>Countries</h2>
      <form>
        <div>
          filter contries <input value={nameFilter} onChange={handleNameFilter}/>
        </div>
      </form>
      <p/>
      <CountryList Countries={Countries} nameFilter={nameFilter} />
    </div>
  )
}

export default App