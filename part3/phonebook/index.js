require('dotenv').config()
const express = require('express')
//const nodemon = require('nodemon')
const morgan = require('morgan')
const cors = require('cors')

// MongoDB
const Person = require('./models/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('type', function (req) { return JSON.stringify(req.body) })
app.use(morgan('tiny'), morgan(':type'))

app.get('/api/info', (request, response) => {
  Person.countDocuments({})
    .then((count) => {
      const currentDate = new Date()

      response.send(
        `Phonebook has info for ${count} people <br/>
            ${currentDate}`
      )
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(() => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'maiformatted if' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})