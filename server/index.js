/* eslint-disable import/order */
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoute = require('./routes/auth');
// const fileUpload = require('express-fileupload');

const app = express();
// app.use(fileUpload());
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use('/auth', userRoute);

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!!!`);
});
