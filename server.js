const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./Src/routes/routes');
const fileUplaod = require('express-fileupload');
app.use(fileUplaod({createParentPath: true}));
app.use(express.json());
app.use(routes);


// Iniciando trativa para subir na AWS
const path = require('path')
const http = require('http')
const port = process.env.PORT || 4000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
app.use('/', express.static(path.join(__dirname,'angular')))
app.use((req, res, next, done) => {
    res.sendFile(__dirname, 'angular', 'index.html');
})

// Finalizando trativa AWS

// Iniciando trativa para o erro de cors
var cors = require('cors');
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});
// Finalizando tratativa para o erro de cors

// Iniciando conexão com o mongoDb Atlas
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
// Finalizando conexão com o mongoDb Atlas


// app.listen(4000, () => {
//     console.log('Conectado');
// })