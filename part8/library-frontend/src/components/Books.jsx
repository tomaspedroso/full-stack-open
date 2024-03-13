import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [genre, setGenre] = useState('all genres')
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: genre === 'all genres' ? null : genre }
  })

  if (books.loading) {
    return <div>loading...</div>
  }

  const genres = new Set()

  books.data.allBooks.map((book) => {
    genres.add(...book.genres)
  })
  genres.add('all genres')

  const handleGenreChange = (newGenre) => {
    setGenre(newGenre)
    refetch()
  }

  return (
    <div>
      <h1>Books</h1>

      <p>In genre <b>{genre}</b></p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.data.allBooks.map((book) =>  (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...genres].map((genre, index) => (
        <button key={index} onClick={() => handleGenreChange(genre)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books