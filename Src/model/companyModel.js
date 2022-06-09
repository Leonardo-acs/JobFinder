const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    companyName: String, 
    login: String,
    email: String,
    phone: Number,
    identity: Number,
    office: String,
    availabilityForm: String,
    state: String, 
    password: Number,
})

const company = mongoose.model('Company', DataSchema)


module.exports = company;