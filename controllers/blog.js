const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.get('/:id', (request, response, next) => {
	Blog
		.findById(request.params.id)
		.then(blogs => {
			if (blogs) {
				response.json(blogs)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
	Blog
		.findByIdAndRemoved(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
	const req = request.body
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter