import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${blog.id}`

  const response = await axios.put(url, blog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, addBlog, setToken, updateBlog, deleteBlog }