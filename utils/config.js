require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI_NOTE

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI_NOTE
}

module.exports = {
	PORT, MONGODB_URI
}