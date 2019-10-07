const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const privateKey = 'nevvord'

function login (req, res) {
  const email    = req.body.email.toLowerCase()
  const password = req.body.password.toString()

  if (!email) {
    return res.status(400).send('No email')
  }

  if (!password) {
    return res.status(400).send('No password')
  }

  db.User.findOne({ email }).select('+password').lean().exec((err, user) => {
    if (err) {
      return res.sendStatus(500)
    }

    if (!user) {
      return res.sendStatus(401)
    }

    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        return res.sendStatus(500)
      }
      if (!passwordMatch) {
        return res.sendStatus(401)
      }

      jwt.sign({ email : user.email, _id : user._id }, privateKey, { expiresIn: 60 * 60 }, (err, token) => {
        res.send({ err, token })
      })
    })
  })
}

module.exports = login

