import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateVoteCount } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(updateVoteCount(id))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotesList
