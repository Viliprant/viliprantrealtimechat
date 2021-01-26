const errorHandler = require('./routes/errors')

const express = require('express')
const app = express()
const port = 3000

// SOCKET.IO
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origins: "*:*",
      methods: ["GET", "POST"]
    }
  });

const consumer = require('./routes/sockets');

const helmet = require("helmet");
const cors = require('cors')

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200);
    res.json({
        'status' : res.statusCode,
        'message' : 'Bienvenue 🎮',
    })
})

consumer.start(io);

app.use(errorHandler.error404);

http.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})