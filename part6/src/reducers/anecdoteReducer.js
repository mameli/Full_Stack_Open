// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE_COUNT':
      const id = action.data.id
      const anecdoteToChange = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      ).sort(sortByVotes)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
      case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

const sortByVotes = (a, b) => {
  return b.votes - a.votes
}

export const updateVoteCount = (id) => {
  return async dispatch => {
		const votedAnecdote = await anecdoteService.vote(id)
		dispatch({
			type: 'UPDATE_COUNT',
			data: { id: votedAnecdote.id, votes: votedAnecdote.votes }
		})
	}
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const object = { content, votes: 0 }
    const newNote = await anecdoteService.createNew(object)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newNote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: notes,
    })
  }
}

export default reducer
