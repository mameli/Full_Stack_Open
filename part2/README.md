## Commands

Replace the env key with the http://api.weatherstack.com/'s API_KEY in the dockerfile first
```
cd part2

docker build -t fullstackp2 .

docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3000:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    fullstackp2
```