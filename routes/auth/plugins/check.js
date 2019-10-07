function check(req, res) {
  function findSend(type, find, msgEn, msgRu) {
    db.User.findOne({
      [type] : find
    }).lean().exec((err, user) => {
      if (err) throw err
      console.log("User: ", user, "Find: ", find);

      if (user) {
        
        return res.status(201).send({
          msgEn: `${msgEn} instance`,
          msgRu: `${msgRu} существует`
        })
      } else {
        return res.status(200).send({
          msgEn: `${msgEn} not instance`,
          msgRu: `${msgRu} не существует`
        })
      }
    })
  }

  if (req.body.type === 'email') {
    console.log("Check body: ", req.body)
    let email = req.body.value.toLowerCase()
    findSend(req.body.type, email, "Email", "Электронный адрес")
  }else if (req.body.type === 'userName'){
    console.log("Check body: ", req.body)
    findSend(req.body.type, req.body.value, "Username", "Пользователь")
  }
}

module.exports = check