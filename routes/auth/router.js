const router = express.Router()

const login = require('./plugins/login')
const registration = require('./plugins/registration')
const check = require('./plugins/check')
const refresh = require('./plugins/refresh')

router
    .post('/login', login)
    .post('/registration', registration)
    .post('/check', check)
    .post('/refresh', refresh)

module.exports = router

