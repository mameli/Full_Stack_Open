
const _ = require('lodash')

const dummy = (blogs) => {
	// ...
	console.log(blogs)
	return 1
}

const totalLikes = (blogs) => {
	const countLikes = (sumLikes, blog) => {
		return sumLikes + blog.likes
	}

	return blogs.reduce(countLikes, 0)
}

const favoriteBlog = (blogs) => {
	const findFavorite = (favorite, blog) => {
		if (favorite.likes < blog.likes)
			return blog
		return favorite
	}

	if (blogs.length === 0)
		return 'Empty blog list'
	const fav = blogs.reduce(findFavorite, blogs[0])
	return {
		author: fav.author,
		likes: fav.likes
	}
}

const mostBlogs = blogs => {

	if (blogs.length === 0) {
		return 'Empty blog list'
	}

	blogs = _.chain(blogs).groupBy('author').groupBy('length').value()
	const maxNumberOfBlogs = Number(_.chain(blogs).keys().max().value())
	let authorMostBlogs = blogs[maxNumberOfBlogs][0][0].author

	if (typeof authorMostBlogs === 'undefined') {
		authorMostBlogs = 'No author'
	}
	return {
		author: authorMostBlogs,
		blogs: maxNumberOfBlogs
	}
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs
}