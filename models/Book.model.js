const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  name: String,
  year: String,
  author: String,
  company: String,
  rented: Boolean,
  user: String
})

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema)
