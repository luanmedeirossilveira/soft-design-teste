const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  username: String,
  password: String
})

LoginSchema.pre('save', function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }
  // eslint-disable-next-line node/handle-callback-err
  bcrypt.genSalt((err, salt) => {
    // eslint-disable-next-line node/handle-callback-err
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      next()
    })
  })
})

LoginSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, res) => {
      console.log(err)
      // eslint-disable-next-line prefer-promise-reject-errors
      res ? resolve(true) : reject()
    })
  })
}

module.exports = mongoose.models.Login || mongoose.model('Login', LoginSchema)
