import React from 'react'

const Country = ({ Country }) => {
    return (
        <div>
            <h2>{Country.name}</h2>
            <p>Alpha code: {Country.alpha2Code}</p>
            <p>Capital:    {Country.capital}</p>
            <p>Region:     {Country.region}</p>
            <div>Languages:
            <ul>
                {Country.languages.map(l =>
                    <li key={l.name}> {l.name}</li>
                )}
            </ul>
            </div>
            <img alt="flag" src={Country.flag} width="100" height="100" />
        </div>
    )
}

export default Country