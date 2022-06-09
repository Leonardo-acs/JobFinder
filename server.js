
const express = require('express');
const mongoose = require('mongoose')
const routes = require('./Src/routes/routes')
const fileUplaod = require('express-fileupload')

const app = express();


mongoose.connect('mongodb+srv://Leo:PLeTys3EfbymBmrk@cluster0.beuie.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("mongo db connected successfully")
        }
    })

app.use(express.json());
app.use(routes);
app.use(fileUplaod());

app.listen(3000, () => {
    console.log('Conectado');
});