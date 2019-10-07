const bcryptjs = require('bcryptjs')

function registration(req, res) {
  const email = req.body.email.toLowerCase()
  const userName = req.body.userName
  const password = req.body.password.toString()

  if (!email) {
    return res.status(204).send({
      msg: 'Dont have email'
    })
  }

  if (!password) {
    return res.status(204).send({
      msg: 'Dont have password'
    })
  }

  db.User.findOne({ email }).lean().exec((err, user) => {
    
    if (err) {
      return res.status(500).send({
        msg: 'Email findOne err',
        err: err
      })
    }
    
    if (user) {
      return res.status(302).send({
        msg: `User with email(${email}) exists`
      })
    }

    db.User.findOne({ userName }).lean().exec((err, user) => {
      if (err) {
        return res.status(500).send({
          msg: 'User findOne err',
          err: err
        })
      }
      
      if (user) {
        return res.status(302).send({
          msg: `User with email(${user}) exists`
        })
      }

      bcryptjs.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).send({
            msg: 'Salt error.',
            err: err
          })
        }
  
        bcryptjs.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: 'Hash error.',
              err: err
            })
          }
  
          db.User.create({
            userName: req.body.userName,
            email,
            password: hash
          })
          
          res.status(201).send({
            type: 'SUCCESS',
            msg: `User ${userName} has been created.`
          })
        })
      })
    })

  })
}

module.exports = registration