# Full_Stack_Open
Deep Dive Into Modern Web Development Full stack open 2020

## Commands
```
cd part1

docker build -t fullstackp1 .

docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3000:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    fullstackp1
```