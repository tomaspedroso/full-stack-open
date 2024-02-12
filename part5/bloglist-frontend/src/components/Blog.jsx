import { useState } from 'react'
import blogs from '../services/blogs'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog, username, updateBlog }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = JSON.parse(JSON.stringify(blog))
    updatedBlog.likes = likes + 1
    updatedBlog.user = updatedBlog.user.id

    try {
      updateBlog(updatedBlog)
      setLikes(likes + 1)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.deleteBlog(blog.id)
        deleteBlog(blog.id)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  return (
    <div style={blogStyle} className='blogBody'>
      <div className='showWithoutView'>
        {blog.title} {blog.author} <button onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
      </div>
      {view &&
      <div className='showWithView'>
        {blog.url} <br></br>
        {likes} <button onClick={handleLike}>like</button> <br></br>
        {blog.user.username} <br></br>
        {blog.user.username === username && <button onClick={handleDelete}>delete</button>}
      </div>
      }

    </div>
  )
}

export default Blog