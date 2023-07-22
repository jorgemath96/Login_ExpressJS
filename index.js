const express = require('express');
const app = express();

const morgan = require('morgan')
const cors = require('cors');
const PORT = process.env.PORT | 4000;


require('dotenv').config();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));


app.use('/auth', require('./src/routes/authentication.js'));


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});