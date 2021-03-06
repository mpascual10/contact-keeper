const express = require('express'); //brings in out express server
const connectDB = require('./config/db');
const app = express(); //initializes express in a variable
const path = require('path');

//this is a test response for any incoming requests to localhost:5000
//app.get('/', (req,res) => res.send('farting is nothing to be embarassed about'));

//connect DATABASE
connectDB();

//init middleware
//middle ware "express" to access json data
app.use(express.json({ extended:false }));


// sends a test response as a json
//app.get('/', (req,res) => res.json({

   // msg: 'farting is okay, i promise'

//}));

//define ROUTES

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//serve static assets in production

if(process.env.NODE_ENV === 'production')
{
    //set static build folder
    app.use(express.static('client/build'));

    //app.get('*') is get anything that isnt above
    //resolve method looks in '__dirname' current directory, then 'client''build' build folder then loads index
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000; //looks for environment variable called port first that used in production //dev uses 5000

app.listen( PORT, () => console.log(`Server started on port ${PORT}`));