/* eslint-disable import/order */
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const followersRoute = require('./routes/followers');
const profilesRoute = require('./routes/users');
const socketManager = require('./socketManager');
// const fileUpload = require('express-fileupload');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/auth', userRoute);
app.use('/posts', postsRoute);
app.use('/followers', followersRoute);
app.use('/users', profilesRoute);

app.get('/testing', (req, res) => {
  console.log('bottom');
  res.send('yup');
});

io.on('connection', socketManager);

const PORT = 80;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}!!!`);
});
