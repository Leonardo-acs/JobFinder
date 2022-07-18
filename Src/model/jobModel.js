const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    jobName: String, 
    companyName: String,
    description: String,
    turn: String,
    contactEmail: String,
    availability: String,
    salary: Number,
})

const job = mongoose.model('Job', DataSchema)


module.exports = job;