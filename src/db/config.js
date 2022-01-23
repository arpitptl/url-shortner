// import mongoose package
const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = 'mongodb://127.0.0.1:27017/url-shortener'

// establishing a database connection
mongoose.connect(DB_URI)

const connection = mongoose.connection

// export the connection object
module.exports = connection