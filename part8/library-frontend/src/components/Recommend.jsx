import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = () => {
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (books.loading) {
    return <div>loading...</div>
  }

  const genre = user.data.me.favoriteGenre

  return (
    <div>
      <h1>Recommendations</h1>

      <p>Book in your favorite genre <b>{genre}</b></p>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.data.allBooks.map((book) => {
            if (book.genres.includes(genre)) {
              return (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend