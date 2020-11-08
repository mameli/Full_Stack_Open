const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

require('dotenv').config()
const Person = require('./models/person')

app.get('/', (request, response) => {
	response.send('<h1>Phonebook!</h1>')
})

app.get('/info', (request, response) => {
	let date = new Date()
	Person.countDocuments().then(numElem => {
		response.send(`
        <h3>Phonebook has info for ${numElem} people!</h3>
        <h3>${date}</h3>
        `)
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id).then(p => {
		if (p) {
			response.json(p)
		} else {
			response.status(404).end()
		}
	})
		.catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(p => {
		response.json(p)
	})
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id).then(p => {
		if (p) {
			response.status(204).end()
		}
	})
		.catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
	const body = request.body

	const newPerson = new Person({
		name: body.name,
		number: body.number,
	})

	newPerson.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body

	const newPerson = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.error(error.name)
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})