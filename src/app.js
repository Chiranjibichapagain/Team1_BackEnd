const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const { MONGODB_URI } = require('./utils/config');
const talentsRouter = require('./routes/talentsRouter');
const companiesRouter = require('./routes/companiesRouter');

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

app.use('/api/talents', talentsRouter);
app.use('/api/companies', companiesRouter);

module.exports = app;
