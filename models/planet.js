const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: { type: String},
  description: { type: String},
})

const Planet = mongoose.model('Planet', planetSchema)
module.exports = Planet