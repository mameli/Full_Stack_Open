const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response) => {
	const user = await User.findById(request.body.userId)
	const body = request.body
	body['user'] = user._id
	const blog = new Blog(body)

	const newBlog = await blog.save()

	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()

	response.status(201).json(newBlog)
})

blogsRouter.put('/:id', async (request, response) => {

	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(200).end()
})

module.exports = blogsRouter