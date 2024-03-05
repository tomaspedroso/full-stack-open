import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Createblog from './Createblog'

test('new blog form', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'New Author',
    url: 'url.com',
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()
  render(<Createblog addBlog={mockHandler} />)

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('Url')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(submitButton)

  expect(mockHandler.mock.calls[0][0]).toEqual(newBlog)
  expect(mockHandler.mock.calls).toHaveLength(1)
})
