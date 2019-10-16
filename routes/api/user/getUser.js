module.exports = function getUser(req, res) {
    if (!req.params.id) {
        return res.status(404).send({
            msg: "User id not found"
        })
    }

    db.User.findOne({ '_id': req.params.id }).lean().exec((err, user) => {
        if (err) {
            return res.status(404).send({
                msg: "User not found"
            })
        }

        if (user) {
            return res.status(200).send({
                msg: "User founded",
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user._id
                }
            })
        }
    })
}