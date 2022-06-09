const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    jobName: String, 
    description: String,
    contractingCompany: String,
    contactEmail: String,
    salary: Number,
})

const job = mongoose.model('Job', DataSchema)


module.exports = job;