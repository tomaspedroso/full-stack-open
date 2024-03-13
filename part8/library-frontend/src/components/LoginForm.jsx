import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data])

  const handleLogin = (event) => {
    event.preventDefault()

    login({ variables: { username, password }})
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm