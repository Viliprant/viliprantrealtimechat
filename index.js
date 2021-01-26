const errorHandler = require('./routes/errors')

const express = require('express')
const app = express()

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
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

consumer.start(io);

app.use(errorHandler.error404);

http.listen(process.env.PORT || 5000, () => {
  console.log(`Listening at http://localhost:${process.env.PORT || 5000}`)
})