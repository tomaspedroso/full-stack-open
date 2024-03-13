import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import AuthorBirthForm from './AuthorBirthForm'

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>Authors</h1>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.data.allAuthors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorBirthForm authors={authors.data.allAuthors} />
    </div>
  )
}

export default Authors