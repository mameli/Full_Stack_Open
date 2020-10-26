const express = require('express')
const morgan = require('morgan')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

require('dotenv').config()
const Person = require('./models/person')

app.get('/', (request, response) => {
    response.send('<h1>Phonebook!</h1>')
})

app.get('/info', (request, response) => {
    let date = new Date()
    response.send(`
        <h3>Phonebook has info for ${persons.length} people!</h3>
        <h3>${date}</h3>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(p => {
        if (p) {
            response.json(p)
        }else {
            response.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).end()
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(p => {
        response.json(p)
    })
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing fields'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})



const PORT = process.env.PORT || process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})