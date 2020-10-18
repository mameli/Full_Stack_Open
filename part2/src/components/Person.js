import React from 'react'

const Person = ({ person, delPerson }) => {

  return (
    <li>
      {person.name} {person.number}
      <button onClick={delPerson}> delete </button>
    </li>
  )
}

export default Person