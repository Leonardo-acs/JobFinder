const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: String, 
    email: String,
    phone: Number,
    identity: Number, 
    age: Number, 
    state: String,
    nationality: String,
    availabilityForm: String,   
    college: String,
    function: String,
    login: String,
    password: Number,
})

const user = mongoose.model('User',DataSchema)


module.exports = user;