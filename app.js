const express = require('express');
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/dataBaseKey');
const bodyParser = require('body-parser');
var path = require('path')
const { errorHandler } = require('./middleware/errorMiddleware');

const port  = process.env.PORT || 3000

//Connect to Database
connectDB()

//Initialize the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false }));

// Body Parser Middleware
app.use(bodyParser.json())

// For Base URL Page
app.use(express.static(path.join(__dirname, './public')))
app.use('/', require('./routes/htmlRoute'));

// For web service
app.use('/authenticate', require('./routes/userRoutes'));
app.use('/loads', require('./routes/loadRoutes'));
app.use('/messages', require('./routes/messageRoute'));

// Error Handler Middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));