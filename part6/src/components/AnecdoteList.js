import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVoteCount } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(updateVoteCount(anecdote.id))
    dispatch(setNotification(`You voted: ${anecdote.content}`))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotesList
