import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS } from '../queries'

const BookForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genresList, setGenresList] = useState([])

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error.graphQLErrors)
    }
  })

  const handleCreation = (event) => {
    event.preventDefault()

    createBook({ variables: {title, author, published: parseInt(published), genres: genresList } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
    setGenresList([])
  }

  return (
    <div>
      <form onSubmit={handleCreation}>
        <div>
          title 
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author 
          <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published 
          <input type='number' value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input type='text' value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button type='button' onClick={() => setGenresList(genresList.concat(genre))}>add genre</button> <br />
          genres: {genresList.join(' ')}
        </div>
        <button>create book</button>
      </form>
    </div>
  )
}

export default BookForm