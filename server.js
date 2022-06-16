
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./Src/routes/routes');
const fileUplaod = require('express-fileupload');

// aws
const path = require('path')
const http = require('http')
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

app.use('/', express.static(path.join(__dirname,'angular')))
app.use((req,res, next) => {
    res.sendFile(__dirname, 'angular', 'index.html');
})

var cors = require('cors');
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});


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
app.use('/', express.static(path.join(__dirname,'front-end')))
app.use((req,res, next) => {
    res.sendFile(__dirname, 'front-end', 'index.html');
})
app.listen(4000, () => {
    console.log('Conectado');
});