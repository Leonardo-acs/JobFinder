//externalizando rotas 
const express = require('express');
const app = express();
const userController = require('../controller/userController');
const companyController = require('../controller/companyController');
const jobController = require('../controller/jobController');
const uploadController = require('../controller/uploadController');
const downloadController = require('../controller/downloadController');
const verifyToken = require('../middleware/authenticateMiddleware');
const routes = express.Router();

var cors = require('cors');
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});

var cors = require('cors');
routes.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});


routes.get('/', (req, res) => {
  res.json({ message: "Conectado" })
})

// routes for users 
routes.get('/getAll', userController.getAllUsers);
routes.post('/userLogin',verifyToken, userController.userLogin);
routes.post('/authenticate', userController.authenticate);
routes.post('/createUser', userController.createUser);
routes.get('/readUser/:_id', verifyToken, userController.readUser);
routes.delete('/deleteUser/:_id',verifyToken, userController.deleteUser);
routes.put('/updateUser',verifyToken, userController.updateUser);

// routes for jobs
routes.get('/jobs', jobController.getAlljobs);
routes.post('/createJob', jobController.createJob);
routes.post('/applied', jobController.applieedByUser);
routes.get('/readJob', jobController.readJob);
routes.get('/readJobApplied', jobController.readJobApplied);
// routes.get('/userApplied', jobController.userApllied);
routes.delete('/deleteJob/:_id', jobController.deleteJob);
routes.put('/updateJob', jobController.updateJob);

// routes for downloads PDF 
routes.post('/upload', uploadController.upload);
routes.get('/getAllResumes', downloadController.getAllResumes)
routes.get('/download/:id', downloadController.downloadById)

// routes for company
routes.get('/companys', companyController.getAllComapanys);
routes.get('/companyLogin', verifyToken, companyController.companylogin);
routes.post('/authenticateCompany', companyController.authenticate);
routes.post('/createCompany', companyController.createComapny);
routes.get('/readCompany/:_id', verifyToken, companyController.readCompany);
routes.delete('/deleteCompany/:cnpj', verifyToken, companyController.deleteCompany);
routes.put('/updateCompany', verifyToken, companyController.updateCompany);
module.exports = routes;