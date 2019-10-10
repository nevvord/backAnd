const router = express.Router()

const registration = require('./plugins/registration')
const check = require('./plugins/check')
const login = require('./plugins/login')
const logout = require('./plugins/logout')
const refresh = require('./plugins/refresh')

router
    .post('/registration', registration)
    .post('/check', check)
    .post('/login', login)
    .post('/logout', logout)
    .post('/refresh', refresh)

module.exports = router

