const jwt  = require('jsonwebtoken')
const uuid = require('uuid')
const {privatKey} = require('config')

function dateChack (date) {
    if (date < Date.now()) {
        return false
    }
    return true
}

function refresh(req, res) {
    const { token } = req.body
    const decodeToken = jwt.verify(token, privatKey)
    console.log(decodeToken)
    
    if (decodeToken) {
        if (dateChack(decodeToken.expToken) === false) {
            console.log(decodeToken.expToken, dateChack(decodeToken.expToken))
            if (dateChack(decodeToken.expRefresh) === false) {
                console.log(decodeToken.expRefresh, dateChack(decodeToken.expRefresh))
                db.RefreshToken.deleteOne({token: decodeToken.refreshToken}, err =>{
                    if (err) {
                        return res.status(500).send({
                            msg: "Server can't delete refresh token",
                            auth: false
                        })
                    }
                    return res.status(401).send({
                        msg: "Bad refresh token. refToken has been deleted",
                        status: "ref401",
                        auth: false,
                        msgToUser: "Ваше время авторизации истекло. Авторезируйтесь пожалуйста."
                    })
                })
            }else{
                db.RefreshToken.findOne({ token:  decodeToken.refreshToken }).lean().exec((err, curentToken) => {
                    if (err) {
                        return res.status(500).send({
                            msg: `Samsing wrong: ${err}`,
                            auth: false
                        })
                    }
                    console.log('Row 44')
                    if (!curentToken) {

                        return res.status(401).send({
                            msg: "Refresh token not found",
                            status: "ref404",
                            auth: false,
                            msgToUser: "Ваш ключь авторизации не найден. Осторожно возможно ктото ни завладел"
                        })
                    }
                    console.log("Row: 52")
                    if (curentToken) {
                        db.RefreshToken.deleteOne({ token:  decodeToken.refreshToken }, err => {
                            if (err) {
                                return res.status(500).send({
                                    msg: "Server can't delete refresh token",
                                    auth: false
                                })
                            }
                            const refreshToken = uuid()
                            const bodyToken = {
                                userName: decodeToken.userName,
                                email: decodeToken.email,
                                _id: decodeToken._id,
                                refreshToken: refreshToken,
                                expToken: Date.now() + 1000 * 60 * 15,
                                expRefresh: Date.now() + 1000 * 60 * 60 * 24 * 6
                            }
                            jwt.sign(bodyToken, privatKey, (err, token) => {
                                db.RefreshToken.create({
                                    userId: decodeToken._id,
                                    token: refreshToken
                                })
                                return res.status(302).send({ err, token,
                                    msg: "New JWToken has been created",
                                    status: "newToken200",
                                    auth: true,
                                    user: {
                                        userName: decodeToken.userName,
                                        email: decodeToken.email,
                                        id: decodeToken._id
                                    }
                                })
                            })
                        })
                    }
                })
            }
        }else{
            
            console.log('Auth success, row 88')
            res
                .status(200)
                .send({
                    auth: true,
                    user: {
                        userName: decodeToken.userName,
                        email: decodeToken.email,
                        id: decodeToken._id
                    }
                })
            console.log("row92")
            
        }
    }else{
        console.log("Token dont instance")
    }
}

module.exports = refresh