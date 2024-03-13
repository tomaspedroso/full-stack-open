import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend' 
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [view, setView] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const newBook = data.data.bookAdded
      window.alert(`New book "${newBook.title}" added`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        if (!allBooks) {
          return {
            allBooks: [newBook] 
          }
        }
        return {
          allBooks: allBooks.concat(newBook)
        }
      })
    }
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <button onClick={() => setView('authors')}>authors</button>
      <button onClick={() => setView('books')}>books</button>

      {!token && <button onClick={() => setView('login')}>login</button>}
      {token && <button onClick={() => setView('addbook')}>add book</button>}
      {token && <button onClick={() => setView('recommend')}>recommend</button>}
      {token && <button onClick={handleLogout}>logout</button>}

      {!token && view === 'login' && <LoginForm setToken={setToken} />}
      {view === 'authors' && <Authors />}
      {view === 'books' && <Books />}
      {view === 'addbook' && <BookForm />}
      {view === 'recommend' && <Recommend />}
    </div>
  )
}

export default App
