const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const server = http.createServer(app);

server.listen(process.env.PORT || config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

var io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

const { saveMessage, getAndCombineMessages } = require('./controllers/userChats');

io.on('connection', function (socket) {
  socket.on('join', async ({ me, contact, room }) => {
    socket.join(room);

    const messages = await getAndCombineMessages(me, contact);
    socket.emit('get message history', messages);
  });

  socket.on('push new message', async (message, room) => {
    saveMessage(message);
    socket.to(room).emit('new message', message);
  });
});
