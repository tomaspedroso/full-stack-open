import PropTypes from 'prop-types'
import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Toggleable from './Togglable'

const Loginform = ({ setUser, setNotification, setIsError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setIsError(false)
      setNotification('Login successful')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (exception) {
      setIsError(true)
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

Loginform.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired
}

export default Loginform