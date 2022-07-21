const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    jobName: String, 
    companyName: String,
    description: String,
    turn: String,
    contactEmail: String,
    availability: String,
    salary: Number,
    job_id: String,
    appliedBy: String,
})

const jobApplied = mongoose.model('jobApplied', DataSchema)


module.exports = jobApplied;