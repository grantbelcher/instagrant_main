/* eslint-disable import/order */
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const followersRoute = require('./routes/followers');
const profilesRoute = require('./routes/users');
// const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/auth', userRoute);
app.use('/posts', postsRoute);
app.use('/followers', followersRoute);
app.use('/users', profilesRoute);

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!!!`);
});
