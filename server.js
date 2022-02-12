const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

// Connect database
var dbURI = "nicetry"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(result => {
    app.listen(3000, () => {
        console.log('Server running...');
    });
 })
 .catch(err => console.log(err));

// Routes
var homeRouter = require('./routes/home');
app.use('/', homeRouter);

var registerRouter = require('./routes/register');
app.use('/register', registerRouter);

var loginRouter = require('./routes/login');
app.use('/login', loginRouter);

var adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);