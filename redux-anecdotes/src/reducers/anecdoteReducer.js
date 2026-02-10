import { createSlice } from '@reduxjs/toolkit'
import * as anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (anecdote) {
        anecdote.votes += 1
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteAsync = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdoteAsync = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updated = { ...anecdote, votes: anecdote.votes + 1 }
    const returned = await anecdoteService.update(updated)
    dispatch(voteAnecdote(returned.id))
  }
}


