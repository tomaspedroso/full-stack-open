import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('blog component tests', () => {
  let container
  const mockHandler = jest.fn()
  const user = {
    username: 'test',
  }
  const blog = {
    title: 'New blog',
    author: 'New author',
    likes: 50,
    url: 'blog.com',
    user: user,
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} username={user.username} updateBlog={mockHandler} />,
    ).container
  })

  test('blog renders title and author only by default', () => {
    const firstView = container.querySelector('.showWithoutView').textContent

    expect(firstView).toContain(blog.title)
    expect(firstView).toContain(blog.author)
    expect(firstView).not.toContain(blog.likes.toString())
    expect(firstView).not.toContain(blog.url)
  })

  test('likes and url are shown when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const details = container.querySelector('.showWithView').textContent

    expect(details).toContain(blog.url)
    expect(details).toContain(blog.likes.toString())
  })

  test('like button call the hanlder', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
