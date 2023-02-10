const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/task');

const app = express();


app.use(bodyParser.json());
app.use(express.static('./public'));
app.use('/api/v1', taskRoutes);
app.use((req, res, next) => {
    const error = new Error('not found');
    error.statusCode = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message; // exits by default 
    res.status(status || 500)
    res.json({
        error: {
            message: message
        }
    })

});

mongoose.connect('MONGODB_URL').then(result => {
    app.listen(3001);
}).catch(err => {
    console.log(err);
})