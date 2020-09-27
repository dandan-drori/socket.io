var app = require('express')()
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = 4000;
const activeUsers = [];

app.get('/', (req, res) => {
    res.status(200).send('Server is running and listening to incoming requests.')
});

io.on('connection', (socket) => {
  // const email = socket.handshake.query.email;
  // socket.join(email);
  // var sock = io.sockets.sockets
  // console.log(Object.keys(sock).length);
  // activeUsers.push(socket);
  console.log('a user connected');
  socket.on('disconnect', () => {
      // activeUsers.splice(activeUsers.indexOf(socket), 1);
      console.log('user disconnected');
  });
  // socket.on('send-message', ({message, hrs, mins, sender, recipients}) => {
  //   recipients.forEach(recipient => {
  //     const newRecipients = recipients.filter(r !== recipient);
  //     newRecipients.push(email);
  //     socket.broadcast.to(recipient).emit('recieve-message', {
  //       recipients: newRecipients, sender: email, message: message
  //     })
  //   })
  // });
  socket.on('message', ({message, hrs, mins, sender, recipient}) => {
    socket.emit('message', {message, hrs, mins, sender, recipient})
  })
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})