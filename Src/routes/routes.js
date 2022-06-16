//externalizando rotas 
const express = require('express');
const userController = require('../controller/userController');
const companyController = require('../controller/companyController')
const jobController = require('../controller/jobController')
const uploadController = require('../controller/uploadController')
const verifyToken = require('../middleware/authenticateMiddleware');

var cors = require('cors');
const { Router } = require('express');
var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ message: "Conectado" })
})

// routes for users 
routes.get('/getAll', userController.getAllUsers);
routes.get('/userLogin',verifyToken,  userController.userLogin);
routes.post('/authenticate', userController.authenticate);
routes.post('/createUser', userController.createUser);
routes.get('/readUser/:cpf', verifyToken, userController.readUser);
routes.delete('/deleteUser/:cpf',verifyToken, userController.deleteUser);
routes.put('/updateUser',verifyToken, userController.updateUser);

// routes for comapnys
routes.get('/companys', companyController.getAllComapanys);
routes.get('/companyLogin', verifyToken, companyController.companylogin);
routes.post('/authenticate', companyController.authenticate);
routes.post('/createCompany', companyController.createComapny);
routes.get('/readCompany/:cnpj', verifyToken, companyController.readCompany);
routes.delete('/deleteCompany/:cnpj', verifyToken, companyController.deleteCompany);
routes.put('/updateCompany', verifyToken, companyController.updateCompany);

// routes for jobs
routes.get('/jobs', jobController.getAlljobs);
routes.post('/createJob', jobController.createJob);
routes.get('/readJob/:_id', jobController.readJob);
routes.delete('/deleteJob/:_id', jobController.deleteJob);
routes.put('/updateJob', jobController.updateJob);

// routes for downloads PDF 
routes.post('/upload', uploadController.upload )
// routes.get('/downloadAll', downloadController.downloadAll)
// routes.get('/download/:_id', downloadController.downloadById)
module.exports = routes;