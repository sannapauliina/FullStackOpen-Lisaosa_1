import { useDispatch } from 'react-redux'
import { createAnecdoteAsync } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdoteAsync(content))
    dispatch(showNotification(`you created '${content}'`, 5))
  }

  return (
    <form onSubmit={addAnecdote} style={{ marginBottom: 20 }}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm



