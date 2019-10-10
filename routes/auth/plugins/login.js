const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const {privatKey} = require('config')

function login(req, res) {
  const email = req.body.email.toLowerCase()
  const password = req.body.password.toString()
  

  if (!email) {
    return res.status(400).send('No email')
  }

  if (!password) {
    return res.status(400).send('No password')
  }

  db.User.findOne({
    email
  }).lean().exec((err, user) => {
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
      const refreshToken = uuid()
      const bodyToken = {
        email: email, 
        _id: user._id,  
        refreshToken : refreshToken, 
        expToken: Date.now() + 1000 * 60 * 15,
        expRefresh: Date.now() + 1000 * 60 * 60 * 24 * 6
      }

      jwt.sign(bodyToken, privatKey, (err, token) => {
        db.RefreshToken.findOne({ userId: user._id }).lean().exec((err, refTok) => {
          if (err) {
           return(
             res
              .status(500)
              .send({
                msg: "Ошибка при поиске рефрештокена"
              }) 
           ) 
          }
          console.log("row 55")
          if (refTok) {
            db.RefreshToken.deleteOne({ _id: refTok._id }, err => {
              if (err) {
                return res
                          .status(500)
                          .send({msg: "Не получилось удалить"})
              }
            })  
          }
          db.RefreshToken.create({
            userId: user._id,
            token: refreshToken
          })
          res.send({err, token, user: {
            userName: user.userName
          }})
        })
      })
    })
  })
}

module.exports = login
