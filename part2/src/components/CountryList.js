import React from 'react'
import Country from './Country'
import SimpleCountry from './SimpleCountry'

const CountryList = (props) => {
    const filteredCountries = props.Countries.filter(c => c.name.toLowerCase().includes(props.nameFilter.toLowerCase()))
    if (filteredCountries.length >= 5) {
        return (
            <div>Too many matches, specity another filter</div>
        )
    }
    if (filteredCountries.length === 1) {
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

export default CountryList