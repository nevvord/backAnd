const jwt = require('jsonwebtoken') 
const { privatKey } = require('config')

function logout (req, res) {
    const { token } = req.body
    console.log("JWT: ", token, "privateKey: ", privatKey)
    
    if (token) {
        jwt.verify( token, privatKey, (err, decode) => {
            if (err) {
                console.log("JWT_ERR: ", err)
                return res
                        .status(500)
                        .send({
                            msg: "Ошибка работы JWT модуля"
                        })
            }

            if (decode) {
                db.RefreshToken.deleteOne({ token: decode.refreshToken}, err => {
                    if (err) {
                        console.log("MONGOOSE_DELETE_ERR: ", err)
                        return res
                            .status(500)
                            .send({
                                msg: "Ошибка работы MONGOOSE(DELETE) модуля"
                            })
                    }
                    console.log("Row 29")
                    return res
                            .status(200)
                            .send({
                                msg: "Logout saccess"
                            })
                })    
            }
        })
    }else{
        console.log("ERR: Req dont have Token")
        
        return res
                .status(404)
                .send({
                    status: "reqToken404",
                    msg: "REQ dont have Token"
                })
    }
    
}

module.exports = logout
