import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Createblog from './components/Createblog'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import Toggleable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [NotificationMessage, setNotificationMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })

    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedBloglistUser) {
      const user = JSON.parse(loggedBloglistUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken('')

    setNotificationMessage('Logout successful')
    setIsError(false)
    setTimeout(() => {
      setNotificationMessage('')
    }, 5000)
  }

  const deleteBlog = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(updatedBlogs)
  }

  const createBlog = async ({ title, author, url }) => {
    console.log('test')
    try {
      const response = await blogService.addBlog({ title, author, url })
      response.user = {}
      response.user.username = user.username

      const updatedBlogs = blogs.concat(response)
      setBlogs(updatedBlogs)

      setIsError(false)
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setIsError(true)
      setNotificationMessage('Error adding a new blog')
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={NotificationMessage} error={isError} />
      {!user && <Loginform setUser={setUser} setNotification={setNotificationMessage} setIsError={setIsError} />}
      {user &&
        <div>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
          <Toggleable buttonLabel='new blog'>
            <Createblog addBlog={createBlog} />
          </Toggleable>
        </div>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} username={user ? user.username : null} updateBlog={blogService.updateBlog} />
      )}
    </div>
  )
}

export default App