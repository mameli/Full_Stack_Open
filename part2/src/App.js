import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  // const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', notes.length, 'notes')
  
  return(<div>
    <ul>
      {notes.map(n =>
              <Note key={n.id} note={n} />
      )}
    </ul>
  </div>
    
  )
}

export default App