# Multi Container App

It's just an app that calculates the Fibonacci value for a given number (not greater than 30).

## Components

- React client
- Express server
- Redis server
- Bun / NodeJS worker

## Flow

1. Client side submits a number to the express server
2. Express server connects to redis server and publishes the new number to a channel (fibo in this case)
3. Bun worker process connects to redis server and subscribes to a channel (fibo)
4. Worker process calculated fibonacci value for the number and sets the key value pair in redis (number:fibonacci value)
5. Client syncs the calculated values, which are returned by an API on the Express server

## Get started

You don't need to have anything installed on your system other than Docker to run this app (and even develop upon it, although you won't get intellisense, error checking, etc.).

1. Clone the repo
2. To start in development mode (hot reload for client, express server and worker process), run the command:

   ```bash
   docker-compose -f dev.docker-compose.yml up --build
   ```

3. Wait for the build to complete and access the client at localhost:5173, or just Ctrl+Click the url in the terminal.

---

### Just a small app that I made in my journey of learning Docker :)
