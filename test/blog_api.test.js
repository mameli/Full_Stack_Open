const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = [
	{
		title: 'my first blog',
		author: 'Filippo Mameli',
		url: 'www.blog1.it',
		likes: 1233
	},
	{
		title: 'my second blog',
		author: 'Filippo Mameli',
		url: 'www.blog2.it',
		likes: 102
	},
]

const user_pass = {
	username: 'mame',
	password: 'asdfasdf'
}

beforeAll(async () => {
	await User.deleteMany({})
	await api
		.post('/api/users')
		.send(user_pass)
		.expect(200)
})

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
})

test('blog are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog title is within the returned blogs', async () => {
	const response = await api.get('/api/blogs')

	const titles = response.body.map(r => r.title)
	expect(titles).toContain(
		'my first blog'
	)
})

test('id is defined', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})

test('blog is added to the list', async () => {
	const newBlog = {
		title: 'my third blog',
		author: 'Filippo Mameli',
		url: 'www.blog3.it',
		likes: 111
	}

	const token = await api
		.post('/api/login')
		.send(user_pass)

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token.body.token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const newResponse = await api.get('/api/blogs')
	expect(newResponse.body).toHaveLength(initialBlogs.length + 1)

	const titles = newResponse.body.map(b => b.title)
	expect(titles).toContain(
		'my third blog'
	)
})

test('blog added without likes', async () => {
	const newBlog = {
		title: 'my blog without likes',
		author: 'Filippo Mameli',
		url: 'www.blog0Likes.it',
	}

	const token = await api
		.post('/api/login')
		.send(user_pass)

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token.body.token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const newResponse = await api.get('/api/blogs')

	const blog = newResponse.body.filter(b => b.title === 'my blog without likes')
	expect(blog[0].likes).toEqual(0)
})

test('blog without required fields', async () => {
	const newBlog = {
		title: 'my blog without url',
		author: 'Filippo Mameli',
	}

	const token = await api
		.post('/api/login')
		.send(user_pass)

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token.body.token}`)
		.send(newBlog)
		.expect(400)
})

test('delete blog', async () => {
	const newBlog = {
		title: 'my blog to delete',
		author: 'Filippo Mameli',
		url: 'www.blogToDelete.it',
	}

	const token = await api
		.post('/api/login')
		.send(user_pass)

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token.body.token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')

	const blog = response.body.filter(b => b.title === 'my blog to delete')[0]
	const idBlog = blog.id

	await api
		.delete(`/api/blogs/${idBlog}`)
		.set('Authorization', `bearer ${token.body.token}`)
		.expect(200)
})

test('delete blog unauthorized user', async () => {
	const newBlog = {
		title: 'my blog to delete',
		author: 'Filippo Mameli',
		url: 'www.blogToDelete.it',
	}

	var token = await api
		.post('/api/login')
		.send(user_pass)

	await api
		.post('/api/blogs')
		.set('Authorization', `bearer ${token.body.token}`)
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')

	const blog = response.body.filter(b => b.title === 'my blog to delete')[0]
	const idBlog = blog.id

	const unauthorized_user = {
		username: 'unauthorized_user',
		password: 'asdfasdf'
	}

	await api
		.post('/api/users')
		.send(unauthorized_user)
		.expect(200)

	token = await api
		.post('/api/login')
		.send(unauthorized_user)

	await api
		.delete(`/api/blogs/${idBlog}`)
		.set('Authorization', `bearer ${token.body.token}`)
		.expect(401)
})

test('blog user password length', async () => {
	const newUser = {
		username: 'shortPass',
		name: 'Filippo',
		password: 'asd'
	}

	await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
})

test('blog user no username', async () => {
	const newUser = {
		name: 'Filippo Mameli',
		password: 'asdfasdf'
	}

	await api
		.post('/api/users')
		.send(newUser)
		.expect(400)
})

afterAll(() => {
	mongoose.connection.close()
})