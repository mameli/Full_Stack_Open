import { createServer } from 'http'

const app = createServer((request, response) =>{
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('hello world')
})

const PORT = 3001

app.listen(PORT)
console.log(`Server runnin on port ${PORT}`);