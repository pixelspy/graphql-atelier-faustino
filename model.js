const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  firstName: String,
  lastName: String,
  nickName: String,
  birth: Date,
  nationality: String
})

exports.Person = Person;