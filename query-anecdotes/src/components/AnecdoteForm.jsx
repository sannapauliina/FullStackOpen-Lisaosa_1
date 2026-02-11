import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })

    dispatch({ type: 'SET', payload: `anecdote '${content}' created` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

